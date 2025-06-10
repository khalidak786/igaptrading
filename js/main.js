// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Dropdown menus for mobile
    const dropdowns = document.querySelectorAll('.dropdown > a');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all product lists
            const productLists = document.querySelectorAll('.product-list');
            productLists.forEach(list => list.classList.remove('active'));
            
            // Show selected product list
            document.getElementById(category).classList.add('active');
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // Sample search data - in a real implementation, this would come from a database
    const searchData = [
        { title: 'Crude Oil', url: 'products/raw-materials.html#crude', category: 'Raw Materials' },
        { title: 'Flow Meters', url: 'industries/oil-gas.html#equipment', category: 'Oil & Gas Equipment' },
        { title: 'Steel Billets', url: 'products/raw-materials.html#metals', category: 'Raw Materials' },
        { title: 'LNG', url: 'products/raw-materials.html#energy', category: 'Energy Products' },
        { title: 'Construction Industry', url: 'industries/construction.html', category: 'Industries' },
        { title: 'Agricultural Commodities', url: 'products/raw-materials.html#agricultural', category: 'Raw Materials' }
    ];
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );
        
        if (results.length > 0) {
            searchResults.innerHTML = '';
            results.forEach(result => {
                const link = document.createElement('a');
                link.href = result.url;
                link.innerHTML = `<strong>${result.title}</strong><br><small>${result.category}</small>`;
                searchResults.appendChild(link);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            searchResults.style.display = 'block';
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
