import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { MapPin, Send, CheckCircle, Loader2, X } from 'lucide-react';
import { GOOGLE_SCRIPT_URL } from '../constants';

interface WeddingEvent {
    title: string;
    time: string;
    date: string;
    lunarDate: string;
    location: string;
    dad_name: string;
    mon_name: string;
    mapUrl: string;
    eventType: string;
}

const ENGAGEMENT: WeddingEvent = {
    title: 'Lễ Nạp Tài',
    time: '09:00 | Thứ Bảy',
    date: '27.12.2025',
    lunarDate: 'Tức Ngày 08 Tháng 11 Năm Ất Tỵ',
    location: 'Tại Tư Gia Nhà Gái',
    dad_name: 'Ông Nguyễn Xuân Thuỷ',
    mon_name: 'Bà Bùi Thị Thuỷ',
    mapUrl: 'https://maps.app.goo.gl/gVK1biwa4VhNNuvw9',
    eventType: 'Lễ Nạp Tài',
};

const CEREMONY: WeddingEvent = {
    title: 'Lễ Thành Hôn',
    time: '10:00 | Chủ Nhật',
    date: '28.12.2025',
    lunarDate: 'Tức Ngày 09 Tháng 11 Năm Ất Tỵ',
    location: 'Tại Tư Gia Nhà Trai',
    dad_name: 'Ông Phạm Công Tuyến',
    mon_name: 'Bà Phạm Thị Thu',
    mapUrl: 'https://maps.app.goo.gl/yPQrP3JHqDWSe1Kh9',
    eventType: 'Lễ Cưới',
};

type ModalStatus = 'idle' | 'submitting' | 'success' | 'error';

interface RsvpModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventType: string;
    eventTitle: string;
    anchorRef: React.RefObject<HTMLDivElement>;
}

const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose, eventType, eventTitle, anchorRef }) => {
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        attending: 'yes',
        message: ''
    });
    const [status, setStatus] = useState<ModalStatus>('idle');
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

    // Cập nhật vị trí khi modal mở
    React.useEffect(() => {
        if (isOpen && anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
            setPosition({
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft,
                width: rect.width,
                height: rect.height
            });
        }
    }, [isOpen, anchorRef]);

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

            const iframeName = 'hidden_iframe_' + Date.now();
            const iframe = document.createElement('iframe');
            iframe.name = iframeName;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = GOOGLE_SCRIPT_URL;
            form.target = iframeName;

            const fields = {
                ...formState,
                event: eventType,
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

            setTimeout(() => {
                document.body.removeChild(form);
                document.body.removeChild(iframe);
            }, 2000);

            setStatus('success');
            setFormState({ name: '', phone: '', attending: 'yes', message: '' });
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleClose = () => {
        setStatus('idle');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
        >
            {/* Modal đè lên event card */}
            <div
                className="absolute bg-white rounded-2xl p-6 shadow-2xl"
                onClick={e => e.stopPropagation()}
                style={{
                    top: position.top,
                    left: position.left,
                    width: position.width,
                    minHeight: position.height,
                    animation: 'modalPop 0.3s ease-out forwards',
                    overflowY: 'auto'
                }}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <h3 className="font-serif text-2xl text-wedding-gold text-center mb-2">
                    Xác Nhận Tham Dự
                </h3>
                <p className="text-center text-gray-500 text-sm mb-6">{eventTitle}</p>

                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                        <h4 className="text-xl font-bold">Cảm ơn bạn!</h4>
                        <p className="text-gray-500 text-center">Chúng tôi đã nhận được phản hồi của bạn.</p>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="text-wedding-gold underline"
                        >
                            Đóng
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
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wedding-gold focus:outline-none"
                        />

                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formState.phone}
                            onChange={handleChange}
                            placeholder="Số điện thoại"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wedding-gold focus:outline-none"
                        />

                        <select
                            name="attending"
                            value={formState.attending}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wedding-gold focus:outline-none"
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
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wedding-gold focus:outline-none resize-none"
                        />

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full bg-wedding-gold text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-wedding-gold/90 transition-colors disabled:opacity-70"
                        >
                            {status === 'submitting' ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Đang gửi...
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
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
    );
};

const EventsSection: React.FC = () => {
    const engagementRef = useRef<HTMLDivElement>(null);
    const ceremonyRef = useRef<HTMLDivElement>(null);

    const [rsvpModal, setRsvpModal] = useState<{
        isOpen: boolean;
        event: WeddingEvent | null;
        anchorRef: React.RefObject<HTMLDivElement> | null;
    }>({
        isOpen: false,
        event: null,
        anchorRef: null
    });

    const openRsvpModal = (event: WeddingEvent, ref: React.RefObject<HTMLDivElement>) => {
        setRsvpModal({ isOpen: true, event, anchorRef: ref });
    };

    const closeRsvpModal = () => {
        setRsvpModal({ isOpen: false, event: null, anchorRef: null });
    };

    return (
        <section id="events" className="py-20 bg-wedding-cream">
            {/* Animation styles */}
            <style>{`
                @keyframes modalPop {
                    0% { opacity: 0; transform: scale(0.95); }
                    100% { opacity: 1; transform: scale(1); }
                }
                @keyframes buttonPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.03); }
                }
                .btn-animated {
                    animation: buttonPulse 2s ease-in-out infinite;
                    transition: all 0.2s ease;
                }
                .btn-animated:hover {
                    animation: none;
                    transform: scale(1.05);
                }
                .btn-animated:active {
                    transform: scale(0.98);
                }
            `}</style>

            {/* Header */}
            <div className="w-full max-w-4xl mx-auto px-4 animate-fade-in-up text-center mb-16">
                <p className="font-sans font-semibold text-sm md:text-base tracking-[0.3em] text-wedding-gold mb-6 uppercase">
                    Trân trọng kính mời
                </p>

                <h2 className="font-serif text-2xl md:text-3xl text-gray-600 mb-8 px-4 leading-relaxed">
                    Đến dự buổi tiệc chung vui <br />
                    cùng gia đình chúng tôi
                </h2>
            </div>

            {/* Events Grid */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Engagement Card */}
                    <div
                        ref={engagementRef}
                        className="text-center animate-fade-in-up border-2 border-wedding-gold rounded-2xl p-8 bg-[#F8F7F6] hover:shadow-lg transition-shadow duration-300"
                    >
                        <h3 className="font-serif text-2xl md:text-3xl text-gray-800 mb-4 uppercase tracking-wider">
                            {ENGAGEMENT.title}
                        </h3>

                        <p className="font-sans text-sm text-gray-500 mb-2">
                            Vào Lúc <span className="text-gray-700 font-semibold">{ENGAGEMENT.time}</span>
                        </p>

                        <div className="flex items-center justify-center gap-4 my-6 font-serif text-wedding-gold">
                            <span className="text-4xl md:text-5xl font-bold">27</span>
                            <div className="w-[1px] h-6 bg-wedding-gold/30"></div>
                            <span className="text-lg font-semibold">Tháng 12</span>
                            <div className="w-[1px] h-6 bg-wedding-gold/30"></div>
                            <span className="text-lg font-semibold">2025</span>
                        </div>

                        <p className="font-sans italic text-gray-500 text-sm mb-6">
                            ({ENGAGEMENT.lunarDate})
                        </p>

                        <div className="border-t border-wedding-gold/20 pt-6">
                            <p className="font-sans text-gray-700 text-lg">
                                <span className="font-bold mb-3">Tiệc Mừng Lễ Vu Quy</span>
                            </p>
                            <p className="font-sans text-sm text-gray-500 mb-4">
                                {ENGAGEMENT.location}
                            </p>
                            <p className="font-sans text-gray-700 mb-1">{ENGAGEMENT.dad_name}</p>
                            <p className="font-sans text-gray-700 mb-4">{ENGAGEMENT.mon_name}</p>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-6">
                                <a
                                    href={ENGAGEMENT.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-animated flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 hover:shadow-md"
                                >
                                    <MapPin size={18} />
                                    Xem bản đồ
                                </a>
                                <button
                                    onClick={() => openRsvpModal(ENGAGEMENT, engagementRef)}
                                    className="btn-animated flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-wedding-gold text-white rounded-lg hover:bg-wedding-gold/90 hover:shadow-md"
                                >
                                    <Send size={18} />
                                    Xác nhận tham gia
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Ceremony Card */}
                    <div
                        ref={ceremonyRef}
                        className="text-center animate-fade-in-up border-2 border-wedding-gold rounded-2xl p-8 bg-[#F8F7F6] hover:shadow-lg transition-shadow duration-300"
                    >
                        <h3 className="font-serif text-2xl md:text-3xl text-gray-800 mb-4 uppercase tracking-wider">
                            {CEREMONY.title}
                        </h3>

                        <p className="font-sans text-sm text-gray-500 mb-2">
                            Vào Lúc <span className="text-gray-700 font-semibold">{CEREMONY.time}</span>
                        </p>

                        <div className="flex items-center justify-center gap-4 my-6 font-serif text-wedding-gold">
                            <span className="text-4xl md:text-5xl font-bold">28</span>
                            <div className="w-[1px] h-6 bg-wedding-gold/30"></div>
                            <span className="text-lg font-semibold">Tháng 12</span>
                            <div className="w-[1px] h-6 bg-wedding-gold/30"></div>
                            <span className="text-lg font-semibold">2025</span>
                        </div>

                        <p className="font-sans italic text-gray-500 text-sm mb-6">
                            ({CEREMONY.lunarDate})
                        </p>
                        <div className="border-t border-wedding-gold/20 pt-6">
                            <p className="font-sans text-gray-700 text-lg">
                                <span className="font-bold mb-3">Tiệc Mừng Lễ Thành Hôn</span>
                            </p>
                            <p className="font-sans text-sm text-gray-500 mb-4">
                                {CEREMONY.location}
                            </p>
                            <p className="font-sans text-gray-700 mb-1">{CEREMONY.dad_name}</p>
                            <p className="font-sans text-gray-700 mb-4">{CEREMONY.mon_name}</p>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-6">
                                <a
                                    href={CEREMONY.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-animated flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 hover:shadow-md"
                                >
                                    <MapPin size={18} />
                                    Xem bản đồ
                                </a>
                                <button
                                    onClick={() => openRsvpModal(CEREMONY, ceremonyRef)}
                                    className="btn-animated flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-wedding-gold text-white rounded-lg hover:bg-wedding-gold/90 hover:shadow-md"
                                >
                                    <Send size={18} />
                                    Xác nhận tham gia
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* RSVP Modal */}
            {rsvpModal.event && rsvpModal.anchorRef && (
                <RsvpModal
                    isOpen={rsvpModal.isOpen}
                    onClose={closeRsvpModal}
                    eventType={rsvpModal.event.eventType}
                    eventTitle={rsvpModal.event.title}
                    anchorRef={rsvpModal.anchorRef}
                />
            )}
        </section>
    );
};

export default EventsSection;