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
                sublist.appendChild(subItem);
            });
            item.appendChild(sublist);
        }

        list.appendChild(item);
    });

    container.appendChild(list);
}
