import React from "react";

export default function Profile() {
  const API_BASE = "https://take-home-test-api.nutech-integrasi.com";
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      const data = await res.json().catch(() => ({}));

      console.log(data.data);
      setFirstName(data.data.first_name);
      setLastName(data.data.last_name);

      if (!res.ok || !data?.data) {
        return <h2>Gagal memuat profil</h2>;
      }
      const { user } = data.data;

      if (user && user.name) {
        return <h2>Selamat Datang {user.name}</h2>;
      }
    } catch {
      return <h2>Gagal memuat profil</h2>;
    }
  };

  fetchProfile();

  return (
    <div>
      <h2>
        Selamat Datang {first_name ?? "Guest"} {last_name}
      </h2>
    </div>
  );
}
