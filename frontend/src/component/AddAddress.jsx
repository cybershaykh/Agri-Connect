import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "./context/StoreContext";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${url}/api/address/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Address added successfully!");
        navigate("/cart");
        setData({
          fullName: "",
          phoneNumber: "",
          pincode: "",
          area: "",
          city: "",
          state: "",
        });
      } else {
        toast.error(response.data.message || "Failed to add address.");
      }
    } catch (error) {
      console.error("Add Address Error:", error);
      toast.error("Failed to save address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
      <form className="w-full" onSubmit={onSubmitHandler}>
        <p className="text-2xl md:text-3xl text-gray-500">
          Add Shipping <span className="font-semibold text-green-600">Address</span>
        </p>
        <div className="space-y-3 max-w-sm mt-10">
          <input
            className="px-2 py-2.5 focus:border-green-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
            type="text"
            placeholder="Full name"
            name="fullName"
            onChange={onChangeHandler}
            value={data.fullName}
            required
          />
          <input
            className="px-2 py-2.5 focus:border-green-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
            type="text"
            placeholder="Phone number"
            name="phoneNumber"
            onChange={onChangeHandler}
            value={data.phoneNumber}
            required
          />
          <input
            className="px-2 py-2.5 focus:border-green-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
            type="text"
            placeholder="Pin code"
            name="pincode"
            onChange={onChangeHandler}
            value={data.pincode}
            required
          />
          <textarea
            className="px-2 py-2.5 focus:border-green-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
            rows={4}
            placeholder="Address (Area and Street)"
            name="area"
            onChange={onChangeHandler}
            value={data.area}
            required
          ></textarea>
          <div className="flex space-x-3">
            <input
              className="px-2 py-2.5 focus:border-green-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="City/District/Town"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              required
            />
            <input
              className="px-2 py-2.5 focus:border-green-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="State"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="max-w-sm w-full mt-6 bg-green-600 text-white py-3 hover:bg-green-700 uppercase"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save address"}
        </button>
      </form>

      <img
        className="md:mr-16 mt-16 md:mt-0"
        src={assets.my_location_image}
        alt="map location"
      />
    </div>
  );
};

export default AddAddress;
