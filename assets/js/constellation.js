// Constellation Drawer Logic

export function initConstellation() {
    const drawerToggle = document.getElementById('drawer-toggle');
    const closeDrawer = document.getElementById('close-drawer');
    const drawer = document.getElementById('constellation-drawer');
    const content = document.getElementById('constellation-content');

    if (!drawerToggle || !drawer) return;

    // Load Tags Data
    fetch('data/tags.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load tags');
            return response.json();
        })
        .then(data => {
            renderConstellation(data, content);
            initConstellationCanvas(drawer); // Point 18: Canvas Lines
        })
        .catch(err => {
            console.error(err);
            content.innerHTML = '<p>The stars are clouded today. (Failed to load tags)</p>';
        });

    drawerToggle.addEventListener('click', () => {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
    });

    closeDrawer.addEventListener('click', () => {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (drawer.classList.contains('open') &&
            !drawer.contains(e.target) &&
            e.target !== drawerToggle &&
            !drawerToggle.contains(e.target)) {
            drawer.classList.remove('open');
            drawer.setAttribute('aria-hidden', 'true');
        }
    });
}

function renderConstellation(data, container) {
    if (!data.domains) return;

    const list = document.createElement('ul');
    list.className = 'constellation-list';

    data.domains.forEach(domain => {
        const item = document.createElement('li');
        item.className = 'constellation-item';

        const link = document.createElement('div');
        link.className = 'constellation-link';
        link.innerHTML = `<strong>${domain.name}</strong>`;

        // Point 19: Highlight related logic (simplified visual feedback)
        link.addEventListener('mouseenter', () => highlightConnections(item, true));
        link.addEventListener('mouseleave', () => highlightConnections(item, false));

        // Toggle for sub-items
        if (domain.topics && domain.topics.length > 0) {
            const toggle = document.createElement('button');
            toggle.className = 'constellation-toggle';
            toggle.textContent = '+';
            toggle.onclick = (e) => {
                e.preventDefault();
                const sublist = item.querySelector('.constellation-sublist');
                sublist.classList.toggle('expanded');
                toggle.textContent = sublist.classList.contains('expanded') ? '-' : '+';
                // Redraw canvas lines if drawer is open
                requestAnimationFrame(() => drawLines(document.getElementById('constellation-canvas')));
            };
            link.appendChild(toggle);
        }

        item.appendChild(link);

        if (domain.topics && domain.topics.length > 0) {
            const sublist = document.createElement('ul');
            sublist.className = 'constellation-sublist';

            domain.topics.forEach(topic => {
                const subItem = document.createElement('li');
                subItem.className = 'constellation-item';
                subItem.innerHTML = `<a href="blog.html?tag=${topic.id}" class="constellation-link">${topic.name}</a>`;

                // Point 19
                subItem.addEventListener('mouseenter', () => highlightConnections(subItem, true));
                subItem.addEventListener('mouseleave', () => highlightConnections(subItem, false));

                sublist.appendChild(subItem);
            });
            item.appendChild(sublist);
        }

        list.appendChild(item);
    });

    container.appendChild(list);
}

// Point 18: Canvas Background Lines
function initConstellationCanvas(drawer) {
    let canvas = document.getElementById('constellation-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'constellation-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        drawer.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = drawer.clientWidth;
        canvas.height = drawer.clientHeight; // Might need scrollHeight
        drawLines(canvas);
    }

    window.addEventListener('resize', resize);
    // Draw initial after a slight delay to allow rendering
    setTimeout(resize, 500);
}

function drawLines(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(139, 69, 19, 0.2)'; // Saddle brown low opacity
    ctx.lineWidth = 1;

    const links = document.querySelectorAll('.constellation-link');
    const positions = [];

    // Get positions relative to drawer
    const drawerRect = document.getElementById('constellation-drawer').getBoundingClientRect();

    links.forEach(link => {
        const rect = link.getBoundingClientRect();
        // Only draw if visible
        if (rect.top >= drawerRect.top && rect.bottom <= drawerRect.bottom) {
             positions.push({
                x: rect.left - drawerRect.left + 10, // Left offset
                y: rect.top - drawerRect.top + rect.height / 2
            });
        }
    });

    // Draw lines connecting sequential items to mimic a tree/star map
    // This is a simple visual approximation.
    ctx.beginPath();
    for (let i = 0; i < positions.length - 1; i++) {
        ctx.moveTo(positions[i].x, positions[i].y);
        ctx.lineTo(positions[i+1].x, positions[i+1].y);
    }
    ctx.stroke();
}

// Point 19: Hover Effect
function highlightConnections(element, active) {
    const allItems = document.querySelectorAll('.constellation-item');
    allItems.forEach(item => {
        if (active) {
            item.style.opacity = item === element || item.contains(element) || element.contains(item) ? '1' : '0.4';
        } else {
            item.style.opacity = '1';
        }
    });
}
