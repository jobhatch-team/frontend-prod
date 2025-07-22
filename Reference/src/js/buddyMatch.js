// Buddy Match Carousel Script
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const matchMeBtn = document.getElementById('matchMeBtn');
    const buddyMatchModal = document.getElementById('buddyMatchModal');
    const closeBuddyMatchBtn = document.getElementById('closeBuddyMatchBtn');
    const rejectBuddyBtn = document.getElementById('rejectBuddyBtn');
    const acceptBuddyBtn = document.getElementById('acceptBuddyBtn');
    const buddyCards = document.querySelectorAll('.buddy-match-card');
    
    // Variables for swipe functionality
    let currentCardIndex = 0;
    let startX, startY, currentX, currentY;
    let initialTransform = '';
    let isSwiping = false;
    
    // Initialize the carousel
    function initCarousel() {
        if (!buddyCards.length) return;
        
        // Reset cards
        buddyCards.forEach(card => {
            card.classList.remove('active', 'swipe-left', 'swipe-right');
            card.style.transform = '';
            card.style.opacity = '';
        });
        
        // Set first card as active
        currentCardIndex = 0;
        if (buddyCards[currentCardIndex]) {
            buddyCards[currentCardIndex].classList.add('active');
        }
    }
    
    // Open the match modal
    function openBuddyMatchModal() {
        if (!buddyMatchModal) return;
        
        // Reset the carousel
        initCarousel();
        
        // Show the modal
        buddyMatchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close the match modal
    function closeBuddyMatchModal() {
        if (!buddyMatchModal) return;
        
        // Hide the modal
        buddyMatchModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Handle swipe left (reject)
    function swipeLeft() {
        if (currentCardIndex >= buddyCards.length) return;
        
        const currentCard = buddyCards[currentCardIndex];
        
        // Add swipe left animation
        currentCard.classList.add('swipe-left');
        
        // Wait for animation to finish then show next card
        setTimeout(() => {
            currentCard.classList.remove('active', 'swipe-left');
            currentCardIndex++;
            
            if (currentCardIndex < buddyCards.length) {
                buddyCards[currentCardIndex].classList.add('active');
            } else {
                // No more cards, close modal or show empty state
                closeBuddyMatchModal();
                // Optionally show a message that there are no more matches
            }
        }, 300);
    }
    
    // Handle swipe right (accept)
    function swipeRight() {
        if (currentCardIndex >= buddyCards.length) return;
        
        const currentCard = buddyCards[currentCardIndex];
        
        // Add swipe right animation
        currentCard.classList.add('swipe-right');
        
        // Wait for animation to finish then show next card
        setTimeout(() => {
            // Show match animation (50% chance for demo)
            if (Math.random() > 0.5) {
                showMatchAnimation(currentCard);
            }
            
            currentCard.classList.remove('active', 'swipe-right');
            currentCardIndex++;
            
            if (currentCardIndex < buddyCards.length) {
                buddyCards[currentCardIndex].classList.add('active');
            } else {
                // No more cards, close modal or show empty state
                if (!document.querySelector('.match-animation.show')) {
                    closeBuddyMatchModal();
                    // Optionally show a message that there are no more matches
                }
            }
        }, 300);
    }
    
    // Show match animation when there's a mutual match
    function showMatchAnimation(card) {
        // Create match animation element if it doesn't exist
        if (!document.querySelector('.match-animation')) {
            createMatchAnimationElement(card);
        }
        
        const matchAnimation = document.querySelector('.match-animation');
        if (!matchAnimation) return;
        
        // Show the animation
        matchAnimation.classList.add('show');
        
        // Set the match profiles
        const userAvatar = document.querySelector('.user-avatar img');
        const buddyAvatar = card.querySelector('.buddy-avatar-circle img');
        const buddyName = card.querySelector('.buddy-match-info h2').textContent;
        
        const matchUserAvatar = matchAnimation.querySelector('.user-avatar-img');
        const matchBuddyAvatar = matchAnimation.querySelector('.buddy-avatar-img');
        const matchBuddyName = matchAnimation.querySelector('.buddy-name');
        
        if (matchUserAvatar && userAvatar) {
            matchUserAvatar.src = userAvatar.src;
        }
        
        if (matchBuddyAvatar && buddyAvatar) {
            matchBuddyAvatar.src = buddyAvatar.src;
        }
        
        if (matchBuddyName) {
            matchBuddyName.textContent = buddyName;
        }
    }
    
    // Create match animation element
    function createMatchAnimationElement(card) {
        const matchAnimation = document.createElement('div');
        matchAnimation.className = 'match-animation';
        
        const buddyName = card.querySelector('.buddy-match-info h2').textContent;
        const buddyAvatar = card.querySelector('.buddy-avatar-circle img').src;
        const userAvatar = document.querySelector('.user-avatar img')?.src || 'src/assets/images/founder-simon.jpeg';
        
        matchAnimation.innerHTML = `
            <h2>It's a Match!</h2>
            <div class="match-profile-container">
                <div class="match-profile">
                    <div class="match-avatar">
                        <img class="user-avatar-img" src="${userAvatar}" alt="Your profile">
                    </div>
                    <div class="match-name">You</div>
                </div>
                
                <div class="match-hearts">
                    <i class="fas fa-heart"></i>
                </div>
                
                <div class="match-profile">
                    <div class="match-avatar">
                        <img class="buddy-avatar-img" src="${buddyAvatar}" alt="${buddyName}">
                    </div>
                    <div class="match-name buddy-name">${buddyName}</div>
                </div>
            </div>
            
            <div class="match-buttons">
                <button class="match-btn keep-swiping-btn">Keep Swiping</button>
                <button class="match-btn message-now-btn">Message Now</button>
            </div>
        `;
        
        document.body.appendChild(matchAnimation);
        
        // Add event listeners
        const keepSwipingBtn = matchAnimation.querySelector('.keep-swiping-btn');
        const messageNowBtn = matchAnimation.querySelector('.message-now-btn');
        
        if (keepSwipingBtn) {
            keepSwipingBtn.addEventListener('click', () => {
                matchAnimation.classList.remove('show');
            });
        }
        
        if (messageNowBtn) {
            messageNowBtn.addEventListener('click', () => {
                matchAnimation.classList.remove('show');
                closeBuddyMatchModal();
                
                // Switch to the buddies tab and scroll to the matched buddy
                const buddiesTab = document.getElementById('buddiesTab');
                if (buddiesTab) {
                    buddiesTab.click();
                }
            });
        }
    }
    
    // Touch Events for mobile swipe
    function handleTouchStart(e) {
        const card = e.currentTarget;
        if (!card.classList.contains('active')) return;
        
        isSwiping = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        initialTransform = card.style.transform;
    }
    
    function handleTouchMove(e) {
        if (!isSwiping) return;
        
        const card = e.currentTarget;
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
        
        const diffX = currentX - startX;
        const diffY = currentY - startY;
        
        // Calculate rotation based on horizontal movement
        const rotate = diffX * 0.1; // Adjust for desired rotation intensity
        
        // Apply transform
        card.style.transform = `translate(${diffX}px, ${diffY}px) rotate(${rotate}deg)`;
        
        // Adjust opacity based on swipe direction
        if (diffX > 0) {
            // Swiping right - increase opacity of a green checkmark overlay
            card.style.boxShadow = `0 0 ${Math.abs(diffX) / 10}px rgba(40, 167, 69, ${Math.abs(diffX) / 200})`;
        } else if (diffX < 0) {
            // Swiping left - increase opacity of a red x overlay
            card.style.boxShadow = `0 0 ${Math.abs(diffX) / 10}px rgba(220, 53, 69, ${Math.abs(diffX) / 200})`;
        }
    }
    
    function handleTouchEnd(e) {
        if (!isSwiping) return;
        
        const card = e.currentTarget;
        isSwiping = false;
        
        const diffX = currentX - startX;
        
        // Determine if swipe was significant enough
        if (Math.abs(diffX) > 100) {
            if (diffX > 0) {
                // Swipe right
                swipeRight();
            } else {
                // Swipe left
                swipeLeft();
            }
        } else {
            // Reset card position if swipe wasn't significant
            card.style.transform = initialTransform;
            card.style.boxShadow = '';
        }
    }
    
    // Event Listeners
    if (matchMeBtn) {
        matchMeBtn.addEventListener('click', openBuddyMatchModal);
    }
    
    if (closeBuddyMatchBtn) {
        closeBuddyMatchBtn.addEventListener('click', closeBuddyMatchModal);
    }
    
    if (rejectBuddyBtn) {
        rejectBuddyBtn.addEventListener('click', swipeLeft);
    }
    
    if (acceptBuddyBtn) {
        acceptBuddyBtn.addEventListener('click', swipeRight);
    }
    
    // Close modal when clicking outside of modal content
    if (buddyMatchModal) {
        buddyMatchModal.addEventListener('click', (e) => {
            if (e.target === buddyMatchModal) {
                closeBuddyMatchModal();
            }
        });
    }
    
    // Add touch events to cards
    buddyCards.forEach(card => {
        card.addEventListener('touchstart', handleTouchStart);
        card.addEventListener('touchmove', handleTouchMove);
        card.addEventListener('touchend', handleTouchEnd);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!buddyMatchModal || !buddyMatchModal.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            swipeLeft();
        } else if (e.key === 'ArrowRight') {
            swipeRight();
        } else if (e.key === 'Escape') {
            closeBuddyMatchModal();
        }
    });
}); 