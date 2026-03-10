import { useState } from 'react';

// Simulated cart data
const initialCart = [
  { id: 1, name: 'Premium Cotton Tee', variant: 'Black / L', price: 38.00, qty: 2, image: '👕' },
  { id: 2, name: 'Tour Hoodie 2024', variant: 'Navy / XL', price: 85.00, qty: 1, image: '🧥' },
];

// Fee calculation based on cart value
const calculateFee = (cartTotal) => {
  if (cartTotal < 10) return 0;
  if (cartTotal <= 30) return 1.00;
  if (cartTotal <= 65) return 2.00;
  if (cartTotal <= 100) return 3.00;
  if (cartTotal <= 200) return 4.00;
  return 5.00;
};

// Icons
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ReturnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const PackageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
  </svg>
);

const PortalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const InfoIcon = ({ onClick }) => (
  <button onClick={onClick} className="text-neutral-400 hover:text-neutral-600 transition-colors ml-1">
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  </button>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const BackArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

// Protection Widget Component
const ProtectionWidget = ({ isChecked, onToggle, onInfoClick, fee, disabled }) => {
  if (disabled) return null;
  
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-neutral-50 rounded-lg border border-neutral-200">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            isChecked 
              ? 'bg-neutral-900 border-neutral-900' 
              : 'border-neutral-300 hover:border-neutral-400'
          }`}
        >
          {isChecked && (
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <div className="flex items-center">
          <span className="text-sm font-medium text-neutral-800">Protected+</span>
          <InfoIcon onClick={onInfoClick} />
        </div>
      </div>
      <span className="text-sm font-medium text-neutral-600">${fee.toFixed(2)}</span>
    </div>
  );
};

// Checkout Protection Widget (simpler inline style)
const CheckoutProtectionWidget = ({ isChecked, onToggle, fee }) => (
  <div className="flex items-center gap-3 py-4">
    <button
      onClick={onToggle}
      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
        isChecked 
          ? 'bg-indigo-600 border-indigo-600' 
          : 'border-neutral-300 hover:border-neutral-400'
      }`}
    >
      {isChecked && (
        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
    <span className="text-sm text-neutral-700">Prepaid Returns & Package Protection for <strong>${fee.toFixed(2)}</strong></span>
  </div>
);

// Info Modal Component
const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const benefits = [
    { icon: <ReturnIcon />, title: 'Free returns & exchanges', description: 'Return or exchange your items without paying for return shipping. 45-day satisfaction guaranteed.' },
    { icon: <PackageIcon />, title: 'Package protection', description: 'Rest assured, if your package is lost, stolen, or damaged, we\'ve got you covered with reshipment or store credit.' },
    { icon: <PortalIcon />, title: 'Easy return portal', description: 'Skip all the back and forth, and submit your return request in just a few clicks.' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white">
                <ShieldIcon />
              </div>
              <span className="font-bold text-lg tracking-tight">Protected+</span>
            </div>
            <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors p-1">
              <CloseIcon />
            </button>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Checkout with confidence</h2>
            <p className="text-neutral-500 text-sm">Shop with confidence, knowing your purchases are protected every step of the way.</p>
          </div>
          <div className="space-y-4 mb-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-700 flex-shrink-0">{benefit.icon}</div>
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm mb-1">{benefit.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-neutral-100">
            <p className="text-xs text-neutral-400 leading-relaxed">
              By purchasing Protected+, you agree and have read the <a href="#" className="underline hover:text-neutral-600">Privacy Policy</a> and <a href="#" className="underline hover:text-neutral-600">Terms and Conditions</a>. Protected+ is subject to Merchant's Return Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Item Component
const CartItem = ({ item, onUpdateQty }) => (
  <div className="flex gap-4 py-4 border-b border-neutral-100">
    <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center text-3xl">{item.image}</div>
    <div className="flex-1 min-w-0">
      <h3 className="font-medium text-sm text-neutral-900 truncate">{item.name}</h3>
      <p className="text-xs text-neutral-500 mt-0.5">{item.variant}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50">−</button>
          <span className="text-sm w-6 text-center">{item.qty}</span>
          <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50">+</button>
        </div>
        <span className="text-sm font-medium">${(item.price * item.qty).toFixed(2)}</span>
      </div>
    </div>
  </div>
);

// Checkout Order Item
const CheckoutOrderItem = ({ item, isProtection = false, protectionFee = 0 }) => (
  <div className="flex gap-3 py-3">
    <div className="relative">
      <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl ${isProtection ? 'bg-neutral-900 text-white' : 'bg-neutral-100'}`}>
        {isProtection ? <ShieldIcon /> : item.image}
      </div>
      <span className="absolute -top-2 -right-2 w-5 h-5 bg-neutral-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
        {isProtection ? 1 : item.qty}
      </span>
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-medium text-sm text-neutral-900">{isProtection ? 'Prepaid Returns & Package Protection' : item.name}</h3>
      {!isProtection && <p className="text-xs text-neutral-500">{item.variant}</p>}
      {isProtection && <p className="text-xs text-neutral-500">${protectionFee.toFixed(2)}</p>}
    </div>
    <span className="text-sm font-medium">${isProtection ? protectionFee.toFixed(2) : (item.price * item.qty).toFixed(2)}</span>
  </div>
);

// Checkout Page Component
const CheckoutPage = ({ cart, protectionAdded, protectionFee, onBack, onToggleProtection }) => {
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = 10.00;
  const total = cartSubtotal + (protectionAdded ? protectionFee : 0) + shipping;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">TOP DRAWER MERCH</div>
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Form */}
          <div className="flex-1 p-6 lg:p-10 lg:border-r border-neutral-200">
            {/* Back button */}
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-6">
              <BackArrow />
              <span>Return to cart</span>
            </button>

            {/* Shop Pay header */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-indigo-600 font-bold text-xl italic">shop</span>
              <span className="text-sm text-neutral-600">demo@topdramerch.com</span>
            </div>

            {/* Collapsible sections */}
            <div className="space-y-0">
              {/* Ship to */}
              <div className="border-t border-neutral-200 py-4">
                <div className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-neutral-500">Ship to</span>
                  <ChevronDown />
                </div>
                <p className="text-sm mt-1">123 Demo Street, Los Angeles CA 90066, US</p>
              </div>

              {/* Shipping method */}
              <div className="border-t border-neutral-200 py-4">
                <div className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-neutral-500">Shipping method</span>
                  <ChevronDown />
                </div>
                <p className="text-sm mt-1">Economy Shipping (2-7 Business days) · $10.00</p>
              </div>

              {/* Payment method */}
              <div className="border-t border-neutral-200 py-4">
                <div className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-neutral-500">Payment method</span>
                  <ChevronDown />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="px-2 py-1 bg-blue-900 text-white text-xs font-bold rounded">VISA</div>
                  <span className="text-sm">Visa •••• 5935</span>
                </div>
              </div>
            </div>

            {/* Protection checkbox - second chance */}
            <div className="border-t border-neutral-200">
              <CheckoutProtectionWidget 
                isChecked={protectionAdded}
                onToggle={onToggleProtection}
                fee={protectionFee}
              />
            </div>

            {/* Pay button */}
            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors mt-4">
              Pay now
            </button>

            <button className="w-full py-3 text-sm text-neutral-600 hover:text-neutral-900 mt-2">
              Check out as guest
            </button>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-96 bg-neutral-50 p-6 lg:p-10">
            <div className="space-y-0 divide-y divide-neutral-200">
              {/* Protection line item (if added) */}
              {protectionAdded && (
                <CheckoutOrderItem isProtection={true} protectionFee={protectionFee} />
              )}
              
              {/* Cart items */}
              {cart.map(item => (
                <CheckoutOrderItem key={item.id} item={item} />
              ))}
            </div>

            {/* Discount code */}
            <div className="flex gap-2 mt-6">
              <input 
                type="text" 
                placeholder="Discount code or gift card" 
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-600 text-sm font-medium rounded-lg transition-colors">
                Apply
              </button>
            </div>

            {/* Totals */}
            <div className="mt-6 pt-6 border-t border-neutral-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              {protectionAdded && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Protected+</span>
                  <span>${protectionFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [view, setView] = useState('store'); // 'store' or 'checkout'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProtectionChecked, setIsProtectionChecked] = useState(false);
  const [protectionAdded, setProtectionAdded] = useState(false);
  const [cart, setCart] = useState(initialCart);

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const protectionFee = calculateFee(cartSubtotal);
  const isEligible = cartSubtotal >= 10;
  const cartTotal = cartSubtotal + (protectionAdded ? protectionFee : 0);

  const handleUpdateQty = (id, newQty) => {
    if (newQty < 1) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, qty: newQty } : item));
    }
  };

  const handleCheckout = () => {
    if (isProtectionChecked && !protectionAdded) {
      setProtectionAdded(true);
    }
    setIsDrawerOpen(false);
    setView('checkout');
  };

  const handleToggleProtection = () => {
    if (protectionAdded) {
      setProtectionAdded(false);
      setIsProtectionChecked(false);
    } else {
      setIsProtectionChecked(!isProtectionChecked);
    }
  };

  const handleCheckoutToggleProtection = () => {
    setProtectionAdded(!protectionAdded);
    setIsProtectionChecked(!protectionAdded);
  };

  if (view === 'checkout') {
    return (
      <CheckoutPage 
        cart={cart}
        protectionAdded={protectionAdded}
        protectionFee={protectionFee}
        onBack={() => setView('store')}
        onToggleProtection={handleCheckoutToggleProtection}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Store Header */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">TOP DRAWER MERCH</div>
          <button onClick={() => setIsDrawerOpen(true)} className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-900 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Demo Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Protected+ Widget Prototype</h1>
          <p className="text-neutral-600 mb-6">Click the cart icon to open the drawer and test the full checkout flow.</p>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-neutral-50 rounded-xl p-4">
              <div className="text-sm text-neutral-500 mb-1">Cart Subtotal</div>
              <div className="text-xl font-bold">${cartSubtotal.toFixed(2)}</div>
            </div>
            <div className="bg-neutral-50 rounded-xl p-4">
              <div className="text-sm text-neutral-500 mb-1">Protection Fee</div>
              <div className="text-xl font-bold">${protectionFee.toFixed(2)}</div>
            </div>
            <div className="bg-neutral-50 rounded-xl p-4">
              <div className="text-sm text-neutral-500 mb-1">Status</div>
              <div className="text-xl font-bold">{protectionAdded ? '✓ Added' : 'Not added'}</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Test the flow:</strong> Open cart → check Protected+ → click Checkout → see the checkout page with the "second chance" widget if you didn't add protection, or see the line item if you did.
            </p>
          </div>
        </div>
      </main>

      {/* Cart Drawer Overlay */}
      {isDrawerOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsDrawerOpen(false)} />}

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
            <h2 className="font-bold text-lg">Your Cart</h2>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-neutral-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 mb-3">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                </svg>
                <p>Your cart is empty</p>
              </div>
            ) : (
              cart.map(item => <CartItem key={item.id} item={item} onUpdateQty={handleUpdateQty} />)
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-neutral-100 px-6 py-4 space-y-4">
              <ProtectionWidget
                isChecked={isProtectionChecked || protectionAdded}
                onToggle={handleToggleProtection}
                onInfoClick={() => setIsModalOpen(true)}
                fee={protectionFee}
                disabled={!isEligible}
              />

              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">${cartSubtotal.toFixed(2)}</span>
              </div>

              {(isProtectionChecked || protectionAdded) && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Protected+</span>
                  <span className="font-medium">${protectionFee.toFixed(2)}</span>
                </div>
              )}

              <div className="flex items-center justify-between font-bold text-lg pt-2 border-t border-neutral-100">
                <span>Total</span>
                <span>${(cartSubtotal + (isProtectionChecked || protectionAdded ? protectionFee : 0)).toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} className="w-full py-4 rounded-xl font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-colors">
                Checkout
              </button>

              <p className="text-xs text-center text-neutral-400">Shipping & taxes calculated at checkout</p>
            </div>
          )}
        </div>
      </div>

      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
