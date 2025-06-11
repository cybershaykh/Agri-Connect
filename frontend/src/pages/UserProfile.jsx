import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ChevronLeft,
  Edit,
  FileText,
  Mail,
  MapPin,
  Phone,
  Save,
  Settings,
  Shield,
  Tractor,
  User,
  X,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@wholefoodsmarket.com",
    phone: "+1 (415) 555-0123",
    bio: "Senior Produce Buyer with 12+ years of experience in organic and sustainable agriculture procurement.",
    location: "San Francisco, CA",
    territory: "West Coast Region",
  });

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleCancel = () => setIsEditing(false);

  const handleSave = () => {
    toast.success("Your profile information has been updated successfully!");
    setIsEditing(false);
  };

  const handleUpdatePassword = () => {
    const { current, new: newPassword, confirm } = passwords;
    if (!current || !newPassword || !confirm) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirm) {
      toast.error("New passwords do not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {/* Header */}
      <header
        className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 top-0 z-50 shadow-sm"
        data-aos="fade-down"
      >
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <a
            href="/"
            className="flex items-center text-slate-700 hover:text-green-600 transition"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </a>
          <h1 className="text-xl font-bold text-slate-900 ml-auto">
            Profile Management
          </h1>
        </div>
      </header>

      {/* Layout */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-80">
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md sticky top-28 p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                SC
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-sm text-slate-600">
                Senior Regional Produce Buyer
              </p>
              <span className="mt-2 inline-block text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Verified Buyer
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-500" />
                <span className="text-slate-700 break-all">
                  {profileData.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-500" />
                <span className="text-slate-700">{profileData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span className="text-slate-700">{profileData.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Tractor className="h-4 w-4 text-slate-500" />
                <span className="text-slate-700">{profileData.territory}</span>
              </div>
            </div>

            <div className="my-6 border-t pt-4 space-y-2">
              {[
                {
                  label: "Personal Information",
                  icon: <User />,
                  tab: "personal",
                },
                {
                  label: "Business Details",
                  icon: <Settings />,
                  tab: "business",
                },
                {
                  label: "Security Settings",
                  icon: <Shield />,
                  tab: "security",
                },
                {
                  label: "Transaction History",
                  icon: <FileText />,
                  tab: "transactions",
                },
              ].map(({ label, icon, tab }) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                    activeTab === tab
                      ? "bg-green-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  } transition`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Section */}
        <section className="flex-1" data-aos="fade-up">
          <div className="bg-white rounded-xl shadow p-6">
            {activeTab === "personal" && (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      Edit Personal Information
                    </h2>
                    <p className="text-sm text-slate-500">
                      Manage your personal details and contact information.
                    </p>
                  </div>
                  <div>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          onClick={handleCancel}
                          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                        >
                          <Save className="h-4 w-4" />
                          Save Changes
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["firstName", "lastName"].map((field) => (
                      <div key={field} className="space-y-1">
                        <label
                          htmlFor={field}
                          className="block text-sm font-medium text-slate-700"
                        >
                          {field === "firstName" ? "First Name" : "Last Name"}
                        </label>
                        <input
                          id={field}
                          value={profileData[field]}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              [field]: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-slate-100"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Email, Phone, Location, Bio */}
                  {["email", "phone", "location", "bio"].map((field, index) => (
                    <div key={index} className="space-y-1">
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium text-slate-700"
                      >
                        {field === "email"
                          ? "Email Address"
                          : field === "phone"
                          ? "Phone Number"
                          : field === "location"
                          ? "Location"
                          : "Professional Bio"}
                      </label>
                      {field === "bio" ? (
                        <textarea
                          id={field}
                          rows={4}
                          value={profileData.bio}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              bio: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-slate-100"
                        />
                      ) : (
                        <input
                          id={field}
                          value={profileData[field]}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              [field]: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="w-full pl-10 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-slate-100"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "security" && (
              <>
                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                  Security Settings
                </h2>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    {[
                      {
                        label: "Current Password",
                        id: "currentPassword",
                        key: "current",
                      },
                      { label: "New Password", id: "newPassword", key: "new" },
                      {
                        label: "Confirm New Password",
                        id: "confirmPassword",
                        key: "confirm",
                      },
                    ].map(({ label, id, key }) => (
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          id={id}
                          type={showPasswords[key] ? "text" : "password"}
                          value={passwords[key]}
                          onChange={(e) =>
                            setPasswords({
                              ...passwords,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-10 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Enter ${label.toLowerCase()}`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              [key]: !prev[key],
                            }))
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                        >
                          {showPasswords[key] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleUpdatePassword}
                      disabled={loading}
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading && (
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      )}
                      {loading ? "Updating..." : "Update Password"}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <p className="font-medium text-green-800">
                          2FA Enabled
                        </p>
                        <p className="text-sm text-green-600">
                          Your account is protected with an authenticator app
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">
                        <Shield className="h-4 w-4" />
                        Active
                      </div>
                    </div>
                    <button className="border border-slate-300 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-100">
                      Manage 2FA Settings
                    </button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Login History</h3>
                    {["Current Session", "Mobile App", "Desktop App"].map(
                      (label, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                        >
                          <div>
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-slate-600">
                              San Francisco, CA •{" "}
                              {label === "Mobile App"
                                ? "iPhone • 2 hours ago"
                                : label === "Desktop App"
                                ? "Windows • 1 day ago"
                                : "Chrome on macOS"}
                            </p>
                          </div>
                          <button className="border border-slate-300 text-slate-600 px-3 py-1 rounded hover:bg-slate-100 text-sm">
                            {label === "Current Session"
                              ? "Active Now"
                              : "Revoke"}
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
