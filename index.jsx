import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// QRCode is declared globally in the HTML file

const translations = {
  'en': {
    yourDetails: 'Your Details',
    ourLocation: 'Our Location',
    spinToWin: 'Spin to Win',
    congratulations: 'Congratulations!',
    adminPanel: 'Admin Panel',
    promotion: 'Promotion',
    admin: 'Admin',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    phoneInvalid: 'Phone number must be at least 8 digits.',
    phoneInUse: 'This phone number has already claimed a discount.',
    confirm: 'Confirm',
    mapDescription: 'Please review our location on the map below.',
    leaveReview: 'Leave a Review',
    continue: 'Continue',
    spinDescription: 'Press the button to spin the wheel for your discount!',
    spinning: 'Spinning...',
    spinForDiscount: 'Spin for Discount',
    spin: 'SPIN',
    congratsMessage: 'Congratulations, {name}!',
    youWon: "You've won a",
    discount: 'discount!',
    qrCodeInstruction: 'Show this QR code at our store to redeem.',
    sendToWhatsApp: 'Send to My WhatsApp',
    adminLoginPrompt: 'Enter password to access admin panel.',
    password: 'Password',
    incorrectPassword: 'Incorrect password.',
    login: 'Login',
    tableName: 'Name',
    tablePhone: 'Phone',
    tableDiscount: 'Discount',
    clearAllData: 'Clear All Data',
    confirmClearData: 'Are you sure you want to clear all collected data?',
    noData: 'No data collected yet.',
    whatsappMessage: 'Hello {name}! You\'ve won a {discount}% discount at MOKTA WACH! Here is your QR code for redemption:',
  },
  'ar-tn': {
    yourDetails: 'تفاصيلك',
    ourLocation: 'موقعنا',
    spinToWin: 'أدر العجلة و اربح',
    congratulations: 'مبروك!',
    adminPanel: 'لوحة التحكم',
    promotion: 'العرض',
    admin: 'المسؤول',
    fullName: 'الاسم الكامل',
    phoneNumber: 'رقم الهاتف',
    phoneInvalid: 'رقم الهاتف يجب أن يتكون من 8 أرقام على الأقل.',
    phoneInUse: 'هذا الرقم قد إستعمل للحصول على تخفيض من قبل.',
    confirm: 'تأكيد',
    mapDescription: 'الرجاء الإطلاع على موقعنا على الخريطة.',
    leaveReview: 'أترك تقييم',
    continue: 'متابعة',
    spinDescription: 'إضغط على الزر لتدوير العجلة و الحصول على تخفيضك!',
    spinning: '...تدور',
    spinForDiscount: 'أدر للفوز بتخفيض',
    spin: 'أدر',
    congratsMessage: 'مبروك, {name}!',
    youWon: 'لقد فزت بـ',
    discount: 'تخفيض!',
    qrCodeInstruction: 'أظهر هذا الرمز في متجرنا للحصول على التخفيض.',
    sendToWhatsApp: 'أرسل إلى حسابي واتساب',
    adminLoginPrompt: 'أدخل كلمة المرور للدخول إلى لوحة التحكم.',
    password: 'كلمة المرور',
    incorrectPassword: 'كلمة مرور خاطئة.',
    login: 'دخول',
    tableName: 'الاسم',
    tablePhone: 'الهاتف',
    tableDiscount: 'التخفيض',
    clearAllData: 'حذف كل البيانات',
    confirmClearData: 'هل أنت متأكد أنك تريد حذف كل البيانات المجمعة؟',
    noData: 'لا توجد بيانات بعد.',
    whatsappMessage: 'مرحبا {name}! لقد فزت بخصم {discount}% في MOKTA WACH! هذا هو رمز QR الخاص بك للاستفادة من الخصم:',
  },
};


const App = () => {
    // Promotion flow state
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const wheelRef = useRef(null);

    // App view and admin state
    const [view, setView] = useState('promotion'); // 'promotion', 'adminLogin', 'adminDashboard'
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [collectedData, setCollectedData] = useState([]);
    
    // Language state
    const [lang, setLang] = useState('ar-tn'); // 'en' | 'ar-tn'

    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar-tn' ? 'rtl' : 'ltr';
    }, [lang]);

    const t = (key, params = {}) => {
        let text = translations[lang][key] || translations['en'][key] || key;
        for (const param in params) {
            text = text.replace(`{${param}}`, String(params[param]));
        }
        return text;
    };

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('moktaWachUserData') || '[]');
            setCollectedData(data);
        } catch (e) {
            console.error("Failed to parse user data from localStorage", e);
            setCollectedData([]);
        }
    }, []);
    
    const resetPromotion = () => {
        setStep(1);
        setName('');
        setPhone('');
        setPhoneError('');
        setDiscount(0);
        setView('promotion');
    };

    const nextStep = () => setStep(s => s + 1);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const digitsOnly = phone.replace(/\D/g, '');

        if (digitsOnly.length < 8) {
            setPhoneError(t('phoneInvalid'));
            return;
        }

        if (collectedData.some(entry => entry.phone === phone)) {
            setPhoneError(t('phoneInUse'));
            return;
        }
        
        if (name) {
            setPhoneError('');
            nextStep();
        }
    };

    const handleMapViewed = () => {
        nextStep();
    };

    const handleSpin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        const segments = [5, 10, 15, 20, 25, 10, 5, 15];
        const randomSegment = Math.floor(Math.random() * segments.length);
        const selectedDiscount = segments[randomSegment];
        const degreesPerSegment = 360 / segments.length;
        const randomOffset = Math.random() * degreesPerSegment - (degreesPerSegment / 2);
        const totalRotation = 360 * 5 + (randomSegment * degreesPerSegment) + randomOffset;

        if (wheelRef.current) {
            wheelRef.current.style.transition = 'transform 4s ease-out';
            wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
        }

        setTimeout(() => {
            setDiscount(selectedDiscount);

            const newData = { name, phone, discount: selectedDiscount, id: Date.now() };
            const updatedData = [...collectedData, newData];
            setCollectedData(updatedData);
            localStorage.setItem('moktaWachUserData', JSON.stringify(updatedData));
            
            nextStep();
            setIsSpinning(false);
        }, 4500);
    };
    
    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (password === '0780') {
            setView('adminDashboard');
            setLoginError('');
            setPassword('');
        } else {
            setLoginError(t('incorrectPassword'));
        }
    };
    
    const handleClearData = () => {
        if (window.confirm(t('confirmClearData'))) {
            localStorage.removeItem('moktaWachUserData');
            setCollectedData([]);
        }
    };

    const getTitle = () => {
        switch (step) {
            case 1: return t('yourDetails');
            case 2: return t('ourLocation');
            case 3: return t('spinToWin');
            case 4: return t('congratulations');
            default: return 'MOKTA WACH';
        }
    };
    
    const renderStep = () => {
        switch (step) {
            case 1:
                return <UserInfoForm name={name} phone={phone} setName={setName} setPhone={setPhone} onSubmit={handleFormSubmit} t={t} phoneError={phoneError} setPhoneError={setPhoneError} collectedData={collectedData} />;
            case 2:
                return <MapView onContinue={handleMapViewed} t={t} />;
            case 3:
                return <SpinWheel onSpin={handleSpin} isSpinning={isSpinning} wheelRef={wheelRef} t={t} />;
            case 4:
                return <ResultScreen name={name} phone={phone} discount={discount} t={t} />;
            default:
                return null;
        }
    };
    
    const renderContent = () => {
        switch(view) {
            case 'adminLogin':
                return <AdminLogin onSubmit={handleAdminLogin} password={password} setPassword={setPassword} error={loginError} t={t} />;
            case 'adminDashboard':
                return <AdminDashboard data={collectedData} onClearData={handleClearData} t={t} />;
            case 'promotion':
            default:
                return renderStep();
        }
    };

    return (
        <div className="container">
            <header className="app-header">
                <div className="lang-switcher">
                    <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
                    <button onClick={() => setLang('ar-tn')} className={lang === 'ar-tn' ? 'active' : ''}>AR</button>
                </div>
                <h1>MOKTA WACH</h1>
                <h2>{view === 'promotion' ? getTitle() : t('adminPanel')}</h2>
                 <nav className="navigation">
                    <button className={view === 'promotion' ? 'active' : ''} onClick={resetPromotion}>{t('promotion')}</button>
                    <button className={view !== 'promotion' ? 'active' : ''} onClick={() => setView('adminLogin')}>{t('admin')}</button>
                </nav>
            </header>
            <main className={view === 'promotion' ? 'step-content' : 'admin-content'}>
                {renderContent()}
            </main>
        </div>
    );
};

const UserInfoForm = ({ name, phone, setName, setPhone, onSubmit, t, phoneError, setPhoneError }) => {
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        if (phoneError) {
            setPhoneError('');
        }
    };

    return (
        <form onSubmit={onSubmit} className="form">
            <div className="form-group">
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
                <label htmlFor="name">{t('fullName')}</label>
            </div>
            <div className="form-group">
                <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} required />
                <label htmlFor="phone">{t('phoneNumber')}</label>
                {phoneError && <p className="form-error-message">{phoneError}</p>}
            </div>
            <button type="submit" className="btn" disabled={!name || !phone}>{t('confirm')}</button>
        </form>
    );
};

const MapView = ({ onContinue, t }) => (
    <div className="map-view">
        <p className="description">{t('mapDescription')}</p>
        <div className="map-container">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.636040520698!2d3.210086376411516!3d36.73142297228391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e4f165a21387b%3A0x8e1a6c1274194488!2sLave-Auto%20Mokta%20Wach!5e0!3m2!1sen!2sdz!4v1720542385418!5m2!1sen!2sdz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
         <a
            href="https://maps.app.goo.gl/qKE1XzhJrzKXr6hPA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
        >
            {t('leaveReview')}
        </a>
        <button onClick={onContinue} className="btn">{t('continue')}</button>
    </div>
);

const SpinWheel = ({ onSpin, isSpinning, wheelRef, t }) => {
    const segments = [5, 10, 15, 20, 25, 10, 5, 15];
    return (
        <div className="spin-container">
             <p className="description">{t('spinDescription')}</p>
            <div className="wheel-wrapper">
                <div className="wheel-pointer"></div>
                <div className="wheel" ref={wheelRef}>
                    {segments.map((segment, index) => (
                        <div key={index} className={`segment segment-${index}`}><span>{segment}%</span></div>
                    ))}
                </div>
                 <div className="wheel-center-button" onClick={onSpin} role="button" aria-label="Spin the wheel">
                    <span>{t('spin')}</span>
                </div>
            </div>
            <button onClick={onSpin} className="btn" disabled={isSpinning}>
                {isSpinning ? t('spinning') : t('spinForDiscount')}
            </button>
        </div>
    );
};

const ResultScreen = ({ name, phone, discount, t }) => {
    const qrCodeRef = useRef(null);
    const qrCodeData = `Name: ${name}, Phone: ${phone}, Discount: ${discount}%`;
    const whatsappMessage = t('whatsappMessage', { name, discount });
    const cleanedPhone = phone.replace(/\D/g, ''); // Remove non-digit characters

    useEffect(() => {
        if (qrCodeRef.current) {
            qrCodeRef.current.innerHTML = ''; // Clear previous QR code
            new QRCode(qrCodeRef.current, {
                text: qrCodeData,
                width: 160,
                height: 160,
            });
        }
    }, [qrCodeData]);

    return (
        <div className="result-container">
            <p className="description">{t('congratsMessage', { name })}</p>
            <p>{t('youWon')}</p>
            <div className="discount-display">{discount}%</div>
            <p>{t('discount')}</p>
            <div className="qrcode" ref={qrCodeRef}></div>
            <p className="description">{t('qrCodeInstruction')}</p>
             <a
                href={`https://wa.me/${cleanedPhone}?text=${encodeURIComponent(whatsappMessage + ' ' + qrCodeData)}`}
                className="whatsapp-button"
                target="_blank"
                rel="noopener noreferrer"
            >
                {t('sendToWhatsApp')}
            </a>
        </div>
    );
};

const AdminLogin = ({ onSubmit, password, setPassword, error, t }) => (
    <form onSubmit={onSubmit} className="form">
        <p className="description">{t('adminLoginPrompt')}</p>
        <div className="form-group">
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required autoFocus />
            <label htmlFor="password">{t('password')}</label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn">{t('login')}</button>
    </form>
);

const AdminDashboard = ({ data, onClearData, t }) => (
    <>
        {data.length > 0 ? (
            <>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>{t('tableName')}</th>
                                <th>{t('tablePhone')}</th>
                                <th>{t('tableDiscount')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(entry => (
                                <tr key={entry.id}>
                                    <td>{entry.name}</td>
                                    <td>{entry.phone}</td>
                                    <td>{entry.discount}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={onClearData} className="btn btn-danger">{t('clearAllData')}</button>
            </>
        ) : (
            <p className="description">{t('noData')}</p>
        )}
    </>
);


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);