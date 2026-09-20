import { useState, type FormEvent } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { createAppointment, type AllData } from "@/lib/public-api";
import { Button } from "@/components/ui/button";

export function PremiumAppointmentForm({ specialties }: { specialties: AllData["chuyenkhoa"] }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      await createAppointment(Object.fromEntries(new FormData(event.currentTarget).entries()));
      event.currentTarget.reset();
      setSent(true);
    } finally {
      setLoading(false);
    }
  }
  return <form id="dat-lich-nhanh" onSubmit={submit} className="premium-form grid gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-900/5 sm:grid-cols-2 lg:grid-cols-5">
    <label className="floating-field"><input name="ho_ten" required placeholder=" " /><span>Họ và tên</span></label>
    <label className="floating-field"><input name="sdt" required placeholder=" " /><span>Số điện thoại</span></label>
    <label className="floating-field"><select name="chuyen_khoa_id" required defaultValue=""><option value="" disabled>Chọn chuyên khoa</option>{specialties.map((item) => <option key={item.id} value={item.id}>{item.ten_chuyen_khoa}</option>)}</select><span>Chuyên khoa</span></label>
    <label className="floating-field"><input name="ngay_hen" type="date" required placeholder=" " /><span>Ngày hẹn</span></label>
    <Button disabled={loading || sent} type="submit" className="h-14 rounded-2xl">{loading ? <><LoaderCircle className="animate-spin" /> Đang gửi...</> : sent ? <><Check /> Đã gửi thành công</> : "Đặt lịch ngay"}</Button>
    {sent && <p className="text-sm font-semibold text-emerald-700 sm:col-span-2 lg:col-span-5">Bệnh viện sẽ gọi lại để xác nhận lịch hẹn.</p>}
  </form>;
}
