import React, { useState } from 'react';
import { X, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

const PhoneModal = ({ isOpen, onClose, onConfirm, initialValue = '' }) => {
    const [phone, setPhone] = useState(initialValue);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!phone || phone.length < 10) {
            setError('Please enter a valid phone number');
            return;
        }
        if (!phone.startsWith('254')) {
            setError('Please start with 254 (e.g., 2547XXXXXXXX)');
            return;
        }
        onConfirm(phone);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[10000] p-4">
            <div className="bg-white border-2 border-emerald-200 w-full max-w-sm rounded-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-2 hover:bg-emerald-50 rounded-full transition-colors"
                >
                    <X size={20} className="text-gray-400" />
                </button>

                <div className="p-8">
                    <div className="text-center mb-6">
                        <div className="inline-flex p-3 bg-emerald-100 rounded-full mb-4">
                            <Phone size={24} className="text-emerald-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">M-Pesa Payment</h2>
                        <p className="text-gray-600 mt-2">Enter your number to receive the STK push</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                                    +
                                </div>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value.replace(/\D/g, ''));
                                        setError('');
                                    }}
                                    placeholder="2547XXXXXXXX"
                                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:outline-none transition-all font-medium text-lg"
                                    autoFocus
                                />
                            </div>
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                        </div>

                        <div className="p-4 bg-emerald-50 rounded-xl flex items-start gap-3 border border-emerald-100">
                            <ShieldCheck className="text-emerald-600 flex-shrink-0" size={18} />
                            <p className="text-xs text-emerald-800 leading-relaxed">
                                Your payment is secure. A prompt will appear on your phone to enter your M-Pesa PIN.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            Pay Now
                            <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PhoneModal;
