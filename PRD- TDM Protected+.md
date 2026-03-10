# Product Requirements Document: Protected+ Order Protection

## Overview
Protected+ is a private Shopify app for Top Drawer Merch's Shopify Plus organization that offers customers optional order protection at checkout. The app provides peace of mind through free returns (45-day window), package protection (reshipment or store credit for lost/damaged packages), and access to an easy returns portal.

This solution brings order protection in-house, replacing third-party services like Route and Corso, giving TDM direct control over the customer experience and revenue stream.

## Target Users
Customers shopping on TDM's Shopify stores during the cart and checkout process.

## Core User Experience

### The Complete Journey
1. Customer adds products to their cart (minimum $10 cart value required)
2. Customer opens cart drawer to review their order
3. Above the subtotal, they see a minimal, non-intrusive checkbox widget labeled "Protected+" with an info icon
4. If they click the info icon, a modal opens showing detailed benefits, pricing, and legal information
5. If they check the checkbox and click "Checkout", the Protected+ line item is added to their cart as they proceed to checkout
6. If they leave the checkbox unchecked in the cart drawer, they see the widget again at checkout as a second conversion opportunity
7. If they previously added Protected+ and refresh the page, the checkbox remains checked and the widget persists

### Widget States & Behavior

**Initial State (Cart Drawer):**
- Appears above the cart subtotal
- Shows checkbox (unchecked by default, unless previously added)
- Displays "Protected+" text
- Shows small info icon (ⓘ)
- Optionally displays the fee amount (A/B testable)
- Inherits store's design system (fonts, colors, spacing)
- Hidden if cart is empty or under $10

**When Checkbox is Toggled:**
- Checking the box does NOT immediately add the line item
- Line item is added only when user clicks "Checkout" or submits cart form
- Unchecking removes the visual checkmark but takes no cart action until checkout is triggered
- No confirmation message shown - silent update

**When Info Icon is Clicked:**
- Opens modal overlay with full protection details
- Modal appears centered on screen with backdrop overlay
- X close button in top-right corner
- Click outside modal or X closes it

**At Checkout (Second Chance):**
- If user dismissed/didn't select protection in cart drawer, widget appears again
- Slightly altered design but maintains minimal, non-invasive aesthetic
- Same functionality as cart drawer version

**If Protection Already Added:**
- Checkbox shows as checked by default
- Widget displays normally but indicates protection is active
- Cannot add multiple Protection+ items (enforced at cart level)

### The Modal Experience

**Visual Structure:**
```
[Store Logo]

Checkout with confidence
Shop with confidence, knowing your purchases are protected every step of the way.

[Icon] Free returns & exchanges
       Return or exchange your items without paying for return shipping. 45-day
       satisfaction guaranteed.

[Icon] Package protection
       Rest assured, if your package is lost, stolen, or damaged, we've got you
       covered.

[Icon] Easy return portal
       Skip all the back and forth, and submit your return in a few clicks.

By purchasing Protected+, you agree and have read the [Privacy Policy] and 
[Terms and Conditions]. Protected+ is subject to Merchant's Return Policy.
```

**Design Specifications:**
- Clean white background (or adapts to store theme - customizable per store)
- Store logo at top
- Headline: "Checkout with confidence"
- Subheadline explaining the value proposition
- Three benefit sections, each with:
  - Simple line icon in rounded square (similar to ASRV style)
  - Bold benefit title
  - Gray descriptive text (2-3 sentences max)
- Legal text at bottom with linked Privacy Policy and Terms
- Responsive design that works on mobile and desktop
- Smooth fade-in animation when opened

### Pricing Structure

**Fee Calculation Based on Cart Value:**
- $10-$30 = $1.00
- $31-$65 = $2.00
- $66-$100 = $3.00
- $101-$200 = $4.00

**Display Options:**
- Fee amount can be shown or hidden in the minimal widget
- This should be A/B testable
- Fee always shown in cart total once added

**Line Item Details:**
- Product name: "Protected+"
- Shows as regular line item in cart
- Price displayed according to tier
- Quantity locked at 1 (cannot be increased)

## Technical Requirements

### Shopify Integration
- Built as private Shopify app for TDM's Plus organization
- Uses Shopify AJAX Cart API for adding/removing line items
- Works with most paid Shopify themes (starting with priority themes for testing)
- No conflicts with existing apps
- Load speed must be instant - feels like hardcoded functionality

### Performance & Loading
- Widget loads with cart drawer (no noticeable delay)
- Modal opens instantly on click
- All assets optimized for fast loading
- Minimal JavaScript footprint

### Theme Compatibility
- Inherits store's design system automatically
  - Fonts from theme
  - Primary/accent colors
  - Button styles
  - Spacing/padding conventions
- Mobile-first responsive design
- Adapts to light or dark theme backgrounds
- Customizable per store if needed

### Cart Behavior
- Widget hidden when cart is empty
- Widget hidden when cart total is under $10
- Protection line item added on checkout button click, not on checkbox toggle
- Maximum of one Protected+ item per order (enforced at cart level)
- If Protected+ already in cart, checkbox defaults to checked state
- Persists across page refreshes

### Data & Privacy
- No additional customer data captured beyond the line item
- No special GDPR considerations (standard Shopify compliance)
- Does not work with subscription products or pre-orders (MVP)

## Must-Have Features (MVP)

1. **Minimal checkbox widget in cart drawer**
   - Positioned above subtotal
   - Checkbox + "Protected+" label + info icon
   - Store theme styling inheritance

2. **Information modal**
   - Store logo
   - Headline and subheadline
   - Three benefits with icons and descriptions
   - Legal text with linked Privacy Policy and Terms
   - Mobile responsive
   - Clean close functionality

3. **Smart line item addition**
   - Adds on checkout button click (not checkbox toggle)
   - Cart value detection ($10 minimum)
   - Tiered fee calculation
   - Prevents duplicate items

4. **Second-chance widget at checkout**
   - Shows if dismissed in cart drawer
   - Slightly different design but same minimal feel
   - Same functionality

5. **State persistence**
   - Checkbox stays checked across page refreshes
   - Protection status maintained through cart session

6. **Mobile optimization**
   - Mobile-first design approach
   - Properly sized for small screens
   - Touch-friendly interactions

7. **Multi-store support**
   - Same functionality across all TDM stores
   - Per-store customization options (logo, theme colors)

## Nice-to-Have Features (Future Iterations)

1. **A/B testing framework**
   - Test showing vs hiding fee amount in widget
   - Test different modal headlines/copy
   - Test widget positioning variations

2. **Social proof**
   - "Trusted by X customers" counter in modal
   - Display dynamically based on actual usage

3. **Analytics & tracking**
   - Conversion rate tracking
   - Modal open rate
   - Dismissal patterns
   - Revenue attribution

4. **Checkout extensibility integration**
   - Native Shopify checkout UI extension
   - More seamless checkout experience
   - Better performance at checkout

5. **Admin configuration panel**
   - Adjust fee tiers without code changes
   - Customize messaging per store
   - Upload custom icons
   - Toggle features on/off per store

6. **Advanced cart variations**
   - Different widget styles for different store aesthetics
   - Seasonal or promotional messaging
   - Dynamic benefit messaging based on products in cart

## Edge Cases & Error Handling

### Cart-Related Scenarios
- **Empty cart**: Widget is hidden
- **Cart under $10**: Widget is hidden
- **Protection already added + page refresh**: Checkbox remains checked, widget displays normally
- **Multiple click attempts**: Maximum of one Protected+ enforced, subsequent clicks have no effect

### Technical Scenarios
- **Fee calculation failure**: Fall back to predetermined rate card
- **Line item add failure**: Silent failure (no error shown to customer), log error for debugging
- **Modal won't open**: Info icon becomes a link to dedicated information page (edge case fallback)
- **AJAX cart API unavailable**: Graceful degradation, log error

### User Interaction
- **Rapid checkbox toggling**: Debounced to prevent issues
- **Multiple Protected+ attempts via cart qty selectors**: Quantity locked at maximum of 1
- **No confirmation on add**: Cart total updates silently, no toast/confirmation message

### Mobile Considerations
- **Limited screen space**: Widget scales appropriately, modal takes full screen if needed
- **Touch targets**: All interactive elements sized for easy mobile interaction (minimum 44x44px)
- **Modal on mobile**: Full-screen or nearly full-screen overlay for readability

## Success Metrics

### Primary KPIs
- **Attachment rate**: Percentage of eligible orders that include Protected+
- **Revenue per order**: Average additional revenue from Protection across all orders
- **Second-chance conversion**: Percentage of users who add Protection at checkout after dismissing in cart

### Secondary Metrics
- **Modal engagement**: Percentage of users who open the info modal
- **Mobile vs desktop performance**: Conversion rate comparison
- **Store-by-store performance**: Which TDM stores see highest adoption

### User Experience Metrics
- **Load time**: Widget appears within 100ms of cart drawer opening
- **Error rate**: Failed line item additions
- **Modal abandonment**: Users who open modal but don't add Protection

## Design Assets Needed

1. **Icons** (3 total, simple line style in rounded squares)
   - Returns/exchange icon (circular arrows)
   - Package protection icon (box/shield)
   - Return portal icon (computer/laptop)

2. **Store logos** for each TDM store in the organization

3. **Legal pages**
   - Privacy Policy URL for each store
   - Terms and Conditions URL for each store

## Out of Scope (For Now)

- Integration with subscription products or pre-orders
- Custom Shopify Scripts or Functions
- Admin dashboard for analytics (manual reporting initially)
- Automated fulfillment workflow for claims
- Customer-facing claims portal
- Email notifications about protection coverage
- International currency support beyond USD

## Dependencies

- Access to TDM's Shopify Plus organization
- Store theme files for integration
- Legal copy for Privacy Policy and Terms
- Store logos in appropriate formats
- Shopify Partners account for app development

## Launch Plan

**Phase 1: Testing (Priority Themes)**
- Start with 2-3 most-used themes (e.g., Alchemy)
- Deploy to staging environment
- Internal QA testing
- Mobile device testing

**Phase 2: Limited Rollout**
- Deploy to 1-2 lower-volume TDM stores
- Monitor performance and conversion
- Gather initial customer feedback
- Fix any critical issues

**Phase 3: Full Rollout**
- Deploy to all TDM stores
- Monitor cross-store performance
- Document any store-specific customizations needed
- Plan for iteration based on data

---

This PRD provides the complete blueprint for building Protected+ as a Shopify app. The focus is on creating a minimal, trustworthy, ASRV-inspired experience that converts without being pushy, while maintaining flexibility for future enhancements and A/B testing.