import { useState, useEffect } from "react";
import { getFirestore, setDoc, doc, collection, getDocs, updateDoc, arrayUnion } from "firebase/firestore";

const db = getFirestore();

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", author: "", comments: [] });
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  const addPost = async () => {
    if (newPost.title && newPost.author) {
      const newPostRef = doc(collection(db, "posts"));
      await setDoc(newPostRef, newPost);
      setPosts([...posts, { ...newPost, id: newPostRef.id }]);
      setNewPost({ title: "", author: "", comments: [] });
    }
  };

  const addComment = async () => {
    if (selectedPost && newComment) {
      const postRef = doc(db, "posts", selectedPost.id);
      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });
      
      const updatedPosts = posts.map(post => 
        post.id === selectedPost.id 
          ? { ...post, comments: [...post.comments, newComment] } 
          : post
      );
      setPosts(updatedPosts);
      setSelectedPost(updatedPosts.find(post => post.id === selectedPost.id));
      setNewComment("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-amber-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Foro de Discusión</h1>
      {!selectedPost ? (
        <>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Título de la publicación"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Autor"
              value={newPost.author}
              onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
              className="mb-2 w-full p-2 border border-gray-300 rounded"
            />
            <button onClick={addPost} className="w-full bg-blue-500 text-white py-2 rounded cursor-pointer">Publicar</button>
          </div>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 shadow-md border border-gray-200 rounded cursor-pointer" onClick={() => setSelectedPost(post)}>
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500">Por {post.author} - {post.comments.length} comentarios</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <button onClick={() => setSelectedPost(null)} className="mb-4 text-blue-500 cursor-pointer">Volver al foro</button>
          <h2 className="text-xl font-semibold">{selectedPost.title}</h2>
          <p className="text-gray-500">Por {selectedPost.author}</p>
          <h3 className="mt-4 text-lg font-semibold">Comentarios:</h3>
          <div className="border p-4 rounded-md mt-2">
            {selectedPost.comments.length > 0 ? (
              selectedPost.comments.map((comment, index) => (
                <p key={index} className="border-b py-1">{comment}</p>
              ))
            ) : (
              <p className="text-gray-500">No hay comentarios aún.</p>
            )}
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Escribe un comentario"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button onClick={addComment} className="w-full bg-green-500 text-white py-2 rounded mt-2 cursor-pointer">Comentar</button>
          </div>
        </div>
      )}
    </div>
  );
}