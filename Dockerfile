FROM nginx:alpine

# Copy all HTML files to nginx default directory
COPY . /usr/share/nginx/html/

# Create nginx config that handles the routing
RUN cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index In\ Phaze\ Homepage.dc.html;

    location / {
        try_files $uri $uri/ /In\ Phaze\ Homepage.dc.html;
    }

    # Serve static files with proper cache headers
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Disable caching for HTML files
    location ~* \.html?$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

