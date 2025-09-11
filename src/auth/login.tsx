import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiError(null);
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Format email tidak valid.";
    if (form.password.length < 6) return "Password minimal 6 karakter.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validate();
    if (err) return setApiError(err);

    setLoading(true);
    try {
      const res = await fetch("https://take-home-test-api.nutech.intergrasi.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = (data?.message as string) || (typeof data === "string" ? data : null) || "Login gagal. Periksa email/password.";
        setApiError(msg);
        return;
      }

      // Ambil token dari berbagai kemungkinan bentuk respons
      const token = data?.data?.token ?? data?.token ?? data?.access_token ?? null;

      if (!token) {
        setApiError("Login berhasil, tapi token tidak ditemukan di respons.");
        return;
      }

      // Simpan token
      localStorage.setItem("auth_token", token);

      // OPTIONAL: simpan profile jika API memberi data user
      if (data?.data?.user) {
        localStorage.setItem("auth_user", JSON.stringify(data.data.user));
      }

      // Arahkan ke halaman utama / dashboard
      navigate("/dashboard");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan jaringan. Coba beberapa saat lagi.";
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="relative bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold shadow">K</div>
            <h1 className="mt-3 text-2xl font-bold text-slate-800">Masuk</h1>
            <p className="text-slate-500 text-sm">Kasirin POS — selamat datang</p>
          </div>

          {apiError && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{apiError}</div>}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" className="mt-1 block w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" required />
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
                  value={form.password}
                  onChange={onChange}
                  className="block w-full rounded-lg border-slate-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
                <button type="button" onClick={() => setShowPwd((s) => !s)} className="absolute inset-y-0 right-0 px-3 text-slate-500 hover:text-slate-700">
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-500">Minimal 6 karakter.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-medium shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>

            <p className="text-center text-sm text-slate-600">
              Belum punya akun?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Daftar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
