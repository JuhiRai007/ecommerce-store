import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);
  
  // Form state to edit
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!user?.id && !user?.userId) {
      setLoading(false);
      return;
    }
    const userId = user.id ?? user.userId; // Support both "id" or "userId"
    
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://fakestoreapi.com/users/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
        setForm({
          firstname: data.name?.firstname || "",
          lastname: data.name?.lastname || "",
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      } catch {
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  if (!user) {
    return <p className="text-center mt-20 text-lg">Please log in to view your profile.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const userId = user.id ?? user.userId;
      const res = await fetch(`https://fakestoreapi.com/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: { firstname: form.firstname, lastname: form.lastname },
          username: form.username,
          email: form.email,
          phone: form.phone,
        }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updatedData = await res.json();
      
      setProfile(updatedData);
      updateUser({
        ...user,
        username: updatedData.username,
        email: updatedData.email,
        phone: updatedData.phone,
        name: updatedData.name,
      });
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading profile...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-gray-700 font-semibold">First Name</span>
            <input
              className="w-full mt-1 rounded border border-gray-300 px-3 py-2"
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              placeholder="First Name"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold">Last Name</span>
            <input
              className="w-full mt-1 rounded border border-gray-300 px-3 py-2"
              type="text"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </label>

          

          

          <label className="block md:col-span-2">
            <span className="text-gray-700 font-semibold">Phone</span>
            <input
              className="w-full mt-1 rounded border border-gray-300 px-3 py-2"
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </label>
        </div>
        <label className="block">
            <span className="text-gray-700 font-semibold">Email</span>
            <input
              className="w-full mt-1 rounded border border-gray-300 px-3 py-2"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </label>

        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full py-3 rounded font-semibold text-white transition ${
            saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
