import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderPlaced = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const spinnerTimer = setTimeout(() => {
      setShowSuccess(true);
    }, 2000);

    const redirectTimer = setTimeout(() => {
      navigate('/userorder');
    }, 5000);

    return () => {
      clearTimeout(spinnerTimer);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6 px-4">
      <div className="flex justify-center items-center relative">
        {!showSuccess ? (
          <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-400 border-gray-200"></div>
        ) : (
          <CheckCircle className="text-green-500 w-20 h-20 transition-all duration-500 scale-100" />
        )}
      </div>

      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Order Placed Successfully
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Redirecting to <span className="font-medium text-green-600">My Orders</span> in a few seconds...
        </p>
      </div>
    </div>
  );
};

export default OrderPlaced;
