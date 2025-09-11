import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface RegisterForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterForm>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiError(null);
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!formData.first_name.trim()) return "First name wajib diisi.";
    if (!formData.last_name.trim()) return "Last name wajib diisi.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Format email tidak valid.";
    if (formData.password.length < 6) return "Password minimal 6 karakter.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    const err = validate();
    if (err) {
      setApiError(err);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: `${formData.first_name} ${formData.last_name}`.trim(),
        email: formData.email,
        password: formData.password,
      };

      const res = await fetch("https://take-home-test-api.nutech.intergrasi.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = (data?.message as string) || (typeof data === "string" ? data : null) || "Registrasi gagal. Coba lagi.";
        setApiError(msg);
        return;
      }

      setToast("Registrasi berhasil! Silakan login.");
      setTimeout(() => navigate("/login"), 900);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setApiError(error.message ?? "Terjadi kesalahan jaringan. Coba beberapa saat lagi.");
      } else {
        setApiError("Terjadi kesalahan jaringan. Coba beberapa saat lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="relative bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="mt-3 text-2xl font-bold text-slate-800">Buat Akun</h1>
            <p className="text-slate-500 text-sm">Kasirin POS — daftar untuk mulai</p>
          </div>

          {apiError && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{apiError}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-slate-700">
                  First name
                </label>
                <input id="first_name" name="first_name" type="text" value={formData.first_name} onChange={handleChange} className="mt-1 block w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" required />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-slate-700">
                  Last name
                </label>
                <input id="last_name" name="last_name" type="text" value={formData.last_name} onChange={handleChange} className="mt-1 block w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" required />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-slate-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
                <button type="button" onClick={() => setShowPwd((s) => !s)} className="absolute inset-y-0 right-0 px-3 text-slate-500 hover:text-slate-700">
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-medium shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
            >
              {loading ? "Mendaftarkan..." : "Daftar"}
            </button>

            <p className="text-center text-sm text-slate-600">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Masuk
              </Link>
            </p>
          </form>

          {toast && <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 text-white text-sm px-4 py-1 shadow">{toast}</div>}
        </div>
      </div>
    </div>
  );
}
