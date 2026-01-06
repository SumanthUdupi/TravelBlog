# Deployment Guide - Odisha Sacred Odyssey

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing
- [ ] Linting passes
- [ ] No console errors
- [ ] No console warnings
- [ ] Code reviewed
- [ ] Environment variables configured

### Performance
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals pass
- [ ] Bundle size acceptable
- [ ] Images optimized
- [ ] Caching configured

### Security
- [ ] HTTPS enabled
- [ ] No secrets in code
- [ ] Security headers configured
- [ ] CORS properly set
- [ ] Rate limiting enabled
- [ ] SQL injection protection
- [ ] XSS protection enabled

### Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Color contrast checked
- [ ] Mobile accessibility tested

### Content
- [ ] All copy proofread
- [ ] Links working
- [ ] Images loading
- [ ] Videos playing
- [ ] Analytics configured
- [ ] SEO tags present

## Deployment Steps

### 1. Local Build

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Run tests
npm run test

# Build for production
npm run build
```

### 2. Staging Deployment

```bash
# Build the project
npm run build

# Test in staging environment
npm run preview

# Verify all features work
# Run full test suite
npm run test

# Check performance
# Check accessibility
# Check security
```

### 3. Production Deployment

#### Option A: Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod

# Verify deployment
vercel logs --prod
```

#### Option B: Manual Deployment

```bash
# Build production bundle
npm run build

# Create deployment package
zip -r dist.zip dist/

# Upload to your server
scp dist.zip user@server:/var/www/

# Extract and deploy
ssh user@server 'cd /var/www/ && unzip dist.zip && rm dist.zip'

# Verify
curl https://yourdomain.com
```

#### Option C: Docker Deployment

```bash
# Build Docker image
docker build -t sacred-odyssey:latest .

# Run container
docker run -p 80:3000 sacred-odyssey:latest

# Push to registry
docker push yourregistry/sacred-odyssey:latest
```

### 4. Post-Deployment

- [ ] Verify site loads
- [ ] Test all major features
- [ ] Check analytics
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify backups
- [ ] Update status page

## Environment Configuration

### Development (.env.development)
```
VITE_SUPABASE_URL=https://dev-instance.supabase.co
VITE_SUPABASE_ANON_KEY=your_dev_key
VITE_API_URL=http://localhost:3000
```

### Staging (.env.staging)
```
VITE_SUPABASE_URL=https://staging-instance.supabase.co
VITE_SUPABASE_ANON_KEY=your_staging_key
VITE_API_URL=https://staging-api.example.com
```

### Production (.env.production)
```
VITE_SUPABASE_URL=https://prod-instance.supabase.co
VITE_SUPABASE_ANON_KEY=your_prod_key
VITE_API_URL=https://api.example.com
```

## Server Configuration

### Nginx Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name sacred-odyssey.com;

    # SSL certificates
    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # CORS headers
    add_header Access-Control-Allow-Origin "https://sacred-odyssey.com" always;
    add_header Access-Control-Allow-Methods "GET, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;

    # Compression
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript
               application/json application/javascript application/xml+rss
               application/rss+xml application/atom+xml image/svg+xml;
    gzip_min_length 1000;

    # Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Service Worker
    location /service-worker.js {
        add_header Cache-Control "max-age=0, no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name sacred-odyssey.com;
    return 301 https://sacred-odyssey.com$request_uri;
}
```

### Vercel Configuration (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_SUPABASE_URL": "@supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@supabase_anon_key"
  },
  "headers": [
    {
      "source": "/service-worker.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## Database Backup & Recovery

### Automatic Backups
- Supabase handles automatic backups
- Retention: 7 days (free tier), 30 days (paid)
- Daily backup schedule

### Manual Backup
```bash
# Export database
pg_dump -U postgres -h db.example.com -d sacred-odyssey > backup.sql

# Restore from backup
psql -U postgres -h db.example.com -d sacred-odyssey < backup.sql
```

## Monitoring & Logging

### Application Monitoring
- Uptime monitoring
- Error tracking
- Performance metrics
- User analytics

### Log Management
- Application logs
- Server logs
- Database logs
- Error tracking

### Alerts
- Downtime alerts
- Error rate alerts
- Performance degradation
- Quota warnings

## Rollback Procedure

### If Deployment Fails

1. **Identify the issue**
   ```bash
   vercel logs --tail
   ```

2. **Rollback to previous version**
   ```bash
   vercel rollback
   ```

3. **Or redeploy previous build**
   ```bash
   git checkout <previous-commit>
   npm run build
   vercel --prod
   ```

4. **Notify stakeholders**
   - Update status page
   - Send notification
   - Log incident

## Maintenance

### Regular Tasks
- Monitor disk space
- Update dependencies
- Security patches
- Database optimization
- Log rotation
- Backup verification

### Monthly Tasks
- Security audit
- Performance review
- User feedback review
- Content updates
- Dependency updates

### Quarterly Tasks
- Full accessibility audit
- Full security audit
- Performance optimization
- Database cleanup
- Architecture review

## Incident Response

### Critical Issues
1. Assess severity
2. Rollback if needed
3. Notify stakeholders
4. Implement fix
5. Test thoroughly
6. Deploy fix
7. Monitor closely
8. Document incident

### Support Contact
- Primary: [contact-email]
- Secondary: [backup-contact]
- On-call: [pager-duty]

## Deployment Checklist Template

```
Date: [Date]
Version: [Version]
Deployer: [Name]
Environment: [Dev/Staging/Prod]

Pre-Deployment
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Performance checked
- [ ] Security verified
- [ ] Content proofread

Deployment Steps
- [ ] Build completed
- [ ] Build verified
- [ ] Deployment executed
- [ ] Smoke tests passed
- [ ] Monitoring active

Post-Deployment
- [ ] Feature verification
- [ ] Performance verified
- [ ] Errors checked
- [ ] Stakeholders notified
- [ ] Documentation updated

Sign-off: [Approved/Rejected]
Notes: [Any issues or observations]
```
