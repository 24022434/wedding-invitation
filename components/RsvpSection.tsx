import { useState, FormEvent, ChangeEvent } from 'react';
import { GOOGLE_SCRIPT_URL } from '../constants';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_FORM_STATE = {
  name: '',
  phone: '',
  event: 'Lễ Nạp Tài',
  attending: 'yes',
  message: ''
};

function RsvpSection() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');

    try {
      const timestamp = new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      // Tạo hidden iframe để tránh CORS
      const iframeName = 'hidden_iframe_' + Date.now();
      const iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Tạo form ẩn và submit qua iframe
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_SCRIPT_URL;
      form.target = iframeName;

      const fields = {
        ...formState,
        timestamp
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // Cleanup sau 2 giây
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 2000);

      setStatus('success');
      setFormState(INITIAL_FORM_STATE);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="rsvp" className="py-20 bg-wedding-cream">
      <div className="container mx-auto px-4 max-w-4xl">

        <div className="text-center mb-16">
          <h2 className="font-script text-5xl text-wedding-gold mb-2">
            R.S.V.P
          </h2>
          <p className="tracking-widest uppercase text-sm text-gray-400">
            Xác nhận tham dự
          </p>
        </div>

        <div className="bg-[#F8F7F6] p-8 rounded-xl shadow-lg">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <CheckCircle className="w-16 h-16 text-[#8C9A8C]" />
              <h4 className="text-xl font-bold">Cảm ơn bạn!</h4>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="text-wedding-gold underline"
              >
                Gửi phản hồi khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                placeholder="Tên của bạn"
                className="w-full px-4 py-2 rounded border"
              />

              <input
                type="tel"
                name="phone"
                required
                value={formState.phone}
                onChange={handleChange}
                placeholder="Số điện thoại"
                className="w-full px-4 py-2 rounded border"
              />

              <select
                name="event"
                value={formState.event}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border"
              >
                <option value="Lễ Nạp Tài">Lễ Nạp Tài</option>
                <option value="Lễ Cưới">Lễ Cưới</option>
              </select>

              <select
                name="attending"
                value={formState.attending}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border"
              >
                <option value="yes">Chắc chắn tham dự</option>
                <option value="maybe">Sẽ báo lại</option>
                <option value="no">Không tham dự</option>
              </select>

              <textarea
                name="message"
                rows={3}
                value={formState.message}
                onChange={handleChange}
                placeholder="Lời chúc..."
                className="w-full px-4 py-2 rounded border"
              />

              <button
                type="submit"
                disabled={status === 'submitting'}
                aria-busy={status === 'submitting'}
                className="w-full bg-wedding-gold text-white py-3 rounded flex justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Đang gửi
                  </>
                ) : (
                  <>
                    <Send />
                    Gửi xác nhận
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">
                  Có lỗi xảy ra, vui lòng thử lại.
                </p>
              )}

            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default RsvpSection;
