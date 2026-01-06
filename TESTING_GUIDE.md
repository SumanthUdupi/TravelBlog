# Testing & QA Guide - Odisha Sacred Odyssey

## Comprehensive Testing Checklist

### 1. Functionality Testing

#### Navigation & User Flow
- [ ] Main navigation menu opens/closes on mobile
- [ ] All nav links navigate to correct sections
- [ ] Breadcrumb navigation displays correctly
- [ ] Back button returns to previous section
- [ ] Deep linking works for all sections
- [ ] Keyboard navigation (Tab, Shift+Tab, Enter)
- [ ] Menu close on Escape key
- [ ] Menu close when clicking outside

#### Search Functionality
- [ ] Search autocomplete suggests results
- [ ] Search filters work by category
- [ ] Clear search button functions
- [ ] No results message displays appropriately
- [ ] Search results are clickable
- [ ] Keyboard navigation in search results

#### Gallery & Media
- [ ] Gallery loads all images
- [ ] Lightbox opens on image click
- [ ] Lightbox navigation (prev/next) works
- [ ] Keyboard navigation in lightbox (arrow keys)
- [ ] Image close (Escape key)
- [ ] Image click navigation (left/right click)
- [ ] Gallery responsive on mobile
- [ ] Lazy loading works for images

#### Authentication
- [ ] Sign up form validates correctly
- [ ] Sign in form authenticates
- [ ] Password reset flow works
- [ ] User profile displays after login
- [ ] Logout clears session
- [ ] Session persists on page reload
- [ ] Protected pages redirect to login

#### Bookmarks & Progress
- [ ] Bookmark button toggles
- [ ] Bookmarks persist after refresh
- [ ] Bookmark list displays saved items
- [ ] Remove bookmark works
- [ ] Reading progress tracks correctly
- [ ] Progress bar updates on scroll
- [ ] Reading time calculates accurately

#### Theme Switching
- [ ] Dark mode toggle works
- [ ] Theme preference persists
- [ ] Text contrast adequate in both themes
- [ ] Images visible in both themes
- [ ] All interactive elements visible

### 2. Accessibility Testing

#### WCAG 2.1 AA Compliance
- [ ] Skip to main content link works
- [ ] Heading hierarchy logical (H1-H6)
- [ ] All images have alt text
- [ ] Form labels associated with inputs
- [ ] Color contrast >= 4.5:1 for text
- [ ] Color contrast >= 3:1 for graphics
- [ ] Focus indicators visible (yellow)
- [ ] Focus order logical
- [ ] No keyboard traps
- [ ] Keyboard accessible all features

#### Screen Reader Testing
- [ ] Page structure announced correctly
- [ ] Form fields labeled properly
- [ ] Button purposes clear
- [ ] Links have descriptive text
- [ ] Dynamic content announced
- [ ] Error messages accessible
- [ ] Success messages announced

#### Mobile Accessibility
- [ ] Touch targets >= 44px
- [ ] Buttons properly sized
- [ ] Forms work on mobile keyboard
- [ ] No horizontal scrolling required
- [ ] Zoom functionality works
- [ ] Text resizable

### 3. Performance Testing

#### Page Load Performance
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3.8s
- [ ] Page load time < 3s on 3G

#### Resource Optimization
- [ ] CSS is minified
- [ ] JavaScript is minified
- [ ] Images optimized (WebP format)
- [ ] Lazy loading implemented
- [ ] Unused CSS/JS removed
- [ ] Critical CSS inlined
- [ ] Fonts optimized

#### Caching
- [ ] Service Worker installed
- [ ] Assets cached appropriately
- [ ] Stale cache updated
- [ ] Offline fallback works
- [ ] Cache size reasonable

### 4. Responsive Design Testing

#### Mobile (< 480px)
- [ ] Layout stacks properly
- [ ] Text readable without zoom
- [ ] Buttons/links appropriately sized
- [ ] Navigation accessible
- [ ] Images scale properly
- [ ] No horizontal scrolling

#### Tablet (481px - 1024px)
- [ ] Two-column layout works
- [ ] Touch targets adequate
- [ ] Gallery grid responsive
- [ ] Forms fit screen

#### Desktop (1025px+)
- [ ] Multi-column layouts display
- [ ] Sidebar visible
- [ ] Max width reasonable
- [ ] Hover states work

### 5. Browser Compatibility

#### Modern Browsers
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

#### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS 14+
- [ ] Samsung Internet
- [ ] Firefox Mobile

### 6. Content Testing

#### Copy & Tone
- [ ] All copy is proofread
- [ ] Tone consistent throughout
- [ ] CTAs compelling and clear
- [ ] No broken links
- [ ] No placeholder content
- [ ] Metadata (title, description) accurate
- [ ] Keywords appropriately used

#### Immersive Elements
- [ ] Timeline animations smooth
- [ ] Reveal animations smooth
- [ ] Parallax effect works
- [ ] Narrative progression logical
- [ ] Emotional beats land
- [ ] Progress indicators helpful

### 7. SEO Testing

#### On-Page SEO
- [ ] Title tags unique and descriptive
- [ ] Meta descriptions present
- [ ] Heading hierarchy correct
- [ ] Images have alt text
- [ ] Internal links relevant
- [ ] Schema markup implemented
- [ ] robots.txt configured

#### Performance SEO
- [ ] Page speed adequate
- [ ] Mobile-friendly
- [ ] Core Web Vitals pass
- [ ] No 404 errors

### 8. Security Testing

#### Data Protection
- [ ] HTTPS enabled
- [ ] No sensitive data in logs
- [ ] Form data encrypted
- [ ] Passwords hashed
- [ ] API keys not exposed
- [ ] No XSS vulnerabilities
- [ ] No SQL injection possible

#### User Privacy
- [ ] Privacy policy accessible
- [ ] Cookies consent implemented
- [ ] No tracking without consent
- [ ] Data deletion possible
- [ ] No third-party data sharing

### 9. Integration Testing

#### Supabase Integration
- [ ] Auth sign up/in works
- [ ] User profile creates
- [ ] Bookmarks save to database
- [ ] Progress tracked in database
- [ ] RLS policies working
- [ ] Error handling graceful

#### Third-Party Services
- [ ] Analytics tracking
- [ ] Email notifications
- [ ] Image hosting working
- [ ] CDN delivering assets

### 10. User Experience Testing

#### Usability
- [ ] First-time user journey clear
- [ ] Error messages helpful
- [ ] Loading states visible
- [ ] Confirmations for destructive actions
- [ ] Feedback for user actions
- [ ] Success messages clear

#### Performance Feel
- [ ] Animations smooth (60fps)
- [ ] No janky scrolling
- [ ] Click feedback immediate
- [ ] Loading indicators present
- [ ] Transitions smooth

## Testing Tools

### Automated Testing
```bash
npm run test              # Run test suite
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

### Manual Testing Checklist
1. Test each section on mobile, tablet, desktop
2. Test with keyboard only
3. Test with screen reader (NVDA/JAWS)
4. Test with Color Blind simulator
5. Test with Developer Tools (DevTools)
6. Test performance with Lighthouse
7. Test accessibility with axe DevTools

### Performance Testing
1. Lighthouse (Chrome DevTools)
2. WebPageTest
3. GTmetrix
4. Mobile Speed Test

### Accessibility Testing
1. axe DevTools
2. WAVE
3. NVDA (free screen reader)
4. Chrome DevTools - Accessibility Tree
5. Keyboard navigation test

## Test Execution

### Before Commit
1. Run linting: `npm run lint`
2. Run tests: `npm run test`
3. Manual smoke test on mobile
4. Manual accessibility check

### Before Staging
1. Full browser compatibility test
2. Full responsive test (all breakpoints)
3. Full accessibility audit
4. Performance audit (Lighthouse)
5. Security audit
6. Content review

### Before Production
1. Final QA sign-off
2. Performance baseline check
3. Security scan
4. Database backup
5. Rollback plan ready

## Known Issues & Workarounds

Document any known issues, their severity, and workarounds:

1. Issue: [Description]
   - Impact: [High/Medium/Low]
   - Status: [Open/In Progress/Closed]
   - Workaround: [If applicable]

## Test Report Template

```
Test Date: [Date]
Tested By: [Name]
Build Version: [Version]
Environment: [Dev/Staging/Prod]

Summary: [Pass/Fail with brief description]

Failed Tests: [List]
Critical Issues: [List]
Minor Issues: [List]

Sign-off: [Approved/Rejected]
```
