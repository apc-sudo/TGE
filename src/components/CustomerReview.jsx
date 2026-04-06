import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const reviewsDataInitial = [
  {
    id: 1,
    name: 'Alina Ram',
    date: '09/21/2023',
    rating: 5,
    comment: 'Beautiful kurta, well made and designed.',
    image: null,
  },
  {
    id: 2,
    name: 'Uma Sreenasan',
    date: '07/13/2023',
    rating: 5,
    comment: 'Very elegant set, loved it!',
    image: null,
  },
  {
    id: 3,
    name: 'Sonali Tomar',
    date: '12/27/2022',
    rating: 5,
    comment: 'Elegant style, embroidery is beautiful.',
    image: null,
  },
  {
    id: 4,
    name: 'Vinutha J Shetty',
    date: '12/26/2022',
    rating: 5,
    comment: 'Very nice dress with attractive embroidery.',
    image: null,
  },
];

const REVIEWS_PER_PAGE = 4;

const CustomerReviews = () => {
  const [reviews, setReviews] = useState(reviewsDataInitial);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: 0,
    title: '',
    comment: '',
    image: null,
    imagePreview: null,
  });

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    form.rating > 0 &&
    form.title.trim() &&
    form.comment.trim();

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviews.slice((page - 1) * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const newReview = {
      id: reviews.length + 1,
      name: form.name,
      date: new Date().toLocaleDateString(),
      rating: form.rating,
      comment: form.comment,
      image: form.imagePreview,
    };
    setReviews([newReview, ...reviews]);
    setForm({
      name: '',
      email: '',
      rating: 0,
      title: '',
      comment: '',
      image: null,
      imagePreview: null,
    });
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-black text-white ">
          Add a Review
        </button>
      </div>

      {paginatedReviews.map((review) => (
        <div key={review.id} className="mb-6 border-b pb-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold text-lg mr-4">
              {review.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{review.name}</p>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-yellow-500 mr-2">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </span>
                <span>{review.date}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 pl-14">{review.comment}</p>
          {review.image && (
            <img src={review.image} alt="review" className="ml-14 mt-2 w-32 h-auto rounded border" />
          )}
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <FiX size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your name (public)"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    onClick={() => setForm({ ...form, rating: num })}
                    className={`text-2xl cursor-pointer ${
                      form.rating >= num ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Give your review a title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                placeholder="Write your comments here"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                rows={4}
                className="w-full border px-3 py-2 rounded"
                required
              ></textarea>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <button
                type="submit"
                className={`w-full py-2 rounded ${
                  isFormValid ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isFormValid}
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
