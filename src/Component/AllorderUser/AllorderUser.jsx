import React from 'react';
import { Link } from 'react-router-dom';

export default function AllorderUser() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl max-w-xl w-full text-center">
        <div className="text-green-500 text-7xl mb-6">✅</div>
        <h2 className="text-4xl font-extrabold text-green-600 mb-4">تمت العملية بنجاح!</h2>
        <p className="text-lg text-gray-700 mb-6">
          شكراً لك على طلبك. نحن نقدر ثقتك وسنعمل على تنفيذ طلبك بأسرع وقت ممكن.
        </p>
        <Link to="/" className="mt-4 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
