// Main JavaScript file
document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // CAROUSEL FUNCTIONALITY
  // ============================================
  const carousel = document.querySelector('[data-carousel]');

  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('[data-prev]');
    const nextBtn = carousel.querySelector('[data-next]');
    const images = track.querySelectorAll('img');

    let currentIndex = 0;
    const totalImages = images.length;

    // Function to update carousel position
    function updateCarousel() {
      const offset = -currentIndex * 100;
      track.style.transform = `translateX(${offset}%)`;
    }

    // Next button
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
      });
    }

    // Previous button
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
      });
    }

    // Auto-play carousel every 10 seconds
    setInterval(function () {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    }, 10000);
  }

  // ============================================
  // MEMBER DIALOG FUNCTIONALITY
  // ============================================

  // Get DOM elements
  const dialog = document.getElementById('memberDialog');
  const dialogOverlay = document.getElementById('dialogOverlay');
  const dialogClose = document.getElementById('dialogClose');
  const dialogImage = document.getElementById('dialogImage');
  const dialogName = document.getElementById('dialogName');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogDescription = document.getElementById('dialogDescription');
  const dialogMajor = document.getElementById('dialogMajor');
  const dialogYear = document.getElementById('dialogYear');
  const dialogHometown = document.getElementById('dialogHometown');

  // Only run member dialog code if dialog exists on page
  if (dialog) {
    // Get all member circles
    const memberCircles = document.querySelectorAll('.member-circle');

    // Function to open dialog
    function openDialog(memberElement) {
      // Read data from the clicked element's data attributes
      const name = memberElement.getAttribute('data-name');
      const title = memberElement.getAttribute('data-title');
      const major = memberElement.getAttribute('data-major');
      const year = memberElement.getAttribute('data-year');
      const hometown = memberElement.getAttribute('data-hometown');
      const description = memberElement.getAttribute('data-description');
      const image = memberElement.getAttribute('data-image');

      // Populate dialog with member data
      if (dialogImage) {
        dialogImage.src = image;
        dialogImage.alt = name;
      }
      if (dialogName) dialogName.textContent = name;
      if (dialogTitle) dialogTitle.textContent = title;
      if (dialogDescription) dialogDescription.textContent = description;
      if (dialogMajor) dialogMajor.textContent = major;
      if (dialogYear) dialogYear.textContent = year;
      if (dialogHometown) dialogHometown.textContent = hometown;

      // Show dialog
      dialog.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close dialog
    function closeDialog() {
      dialog.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }

    // Add click event to all member circles
    memberCircles.forEach(circle => {
      circle.addEventListener('click', (e) => {
        e.preventDefault();
        openDialog(circle);
      });
    });

    // Close dialog when clicking close button
    if (dialogClose) {
      dialogClose.addEventListener('click', closeDialog);
    }

    // Close dialog when clicking overlay
    if (dialogOverlay) {
      dialogOverlay.addEventListener('click', closeDialog);
    }

    // Close dialog with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dialog.classList.contains('active')) {
        closeDialog();
      }
    });

    // Prevent closing when clicking inside dialog content
    const dialogContent = document.getElementById('dialogContent');
    if (dialogContent) {
      dialogContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }

  // ============================================
  // ZI HISTORY TIMELINE
  // ============================================
  const historyTimeline = document.getElementById('historyTimeline');

  if (historyTimeline) {
    const detailPanel = document.getElementById('historyDetailPanel');
    const detailYear = document.getElementById('historyDetailYear');
    const detailLine = document.getElementById('historyDetailLine');
    const detailDescription = document.getElementById('historyDetailDescription');
    const detailNames = document.getElementById('historyDetailNames');
    const detailGallery = document.getElementById('historyDetailGallery');
    const closePanelBtn = document.getElementById('historyPanelClose');

    // Actual lines from your PDF organized by crossing year
    const actualLines = {
      1971: [
        {
          season: 'Fall',
          line: 'The Sadistic Sixteen',
          description: 'The sixteen charter members of the Zeta Iota Chapter of Kappa Alpha Psi Fraternity, Incorporated, laid a foundation that would forever shape the legacy and impact of the fraternity within this community. Their vision, courage, and commitment to achievement in every field of human endeavor brought to life a brotherhood rooted in purpose, scholarship, service, and leadership. Establishing the Zeta Iota Chapter here was more than the creation of a collegiate organization—it was the planting of a standard of excellence, unity, and perseverance that would uplift generations to come. In founding this chapter, these sixteen men created a lasting presence dedicated to mentorship, community engagement, and the development of strong, principled leaders. Their decision to charter Zeta Iota in this location stands as a testament to their belief in the power of brotherhood and their unwavering commitment to leaving a meaningful and enduring legacy.',
          names: ['Regero Samspon', 'Ric Gilmore', 'Henry Childs', 'JuDonn Adams', 'Donald Perry', 'James Harvey', 'Joe Ripley', 'Vernon Neely', 'Charles Benton', 'Joe Tate', 'Ralph Bryant', 'Levert Hood', 'Sam Smiley', 'William Kennedy', 'Jackie Davis', 'Jeff Brooks'],
          images: ['images/zi-lineage/sadisticsixteen.png', 'images/zi-lineage/1971-1.jpg', 'images/zi-lineage/1971-2.jpg']
        }
      ],
      1972: [
        {
          season: 'Spring',
          line: 'The Seven Pains of Judas',
          description: 'Zeta Iota Spring 1972',
          names: ['Thomas Bush', 'Ken Lloyd', 'Larry West', 'Richard Dunn', 'Robert Kinnebrew', 'Harold Moon', 'Gerald Bailey'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        },
        {
          season: 'Fall',
          line: 'The Sweetback\'s BadAsss Six',
          description: 'Zeta Iota Fall 1972',
          names: ['Tony Williamson', 'James Brown', 'Calvin Atkinson', 'Horace King', 'Chris Turner', 'Cedrick Knight'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1973: [
        {
          season: 'Spring',
          line: 'The Inseparable Seven',
          description: 'Zeta Iota Spring 1973',
          names: ['Lorenzo Anderson', 'Mark Hawker', 'Dennis McCluster', 'Danny Thomas', 'Raburn Josey', 'Anthony James', 'Lorenzo Jones'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        },
        {
          season: 'Fall',
          line: 'The Watt Stax Four Pack',
          description: 'Zeta Iota Fall 1973',
          names: ['Willie Brown', 'Ricky Hudson', 'Fred Wilson', 'Ricky Vibens'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1974: [
        {
          season: 'Winter',
          line: 'The Double Dimension',
          description: 'Zeta Iota Winter 1974',
          names: ['Gary Dalton', 'Greg Hill'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      1975: [
        {
          season: 'Spring',
          line: 'The Ace of Diamond',
          description: 'Zeta Iota Spring 1975',
          names: ['Gene Mays'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1976: [
        {
          season: 'Fall',
          line: 'The Four Oracles of Delphi',
          description: 'Zeta Iota Fall 1976',
          names: ['Conner Johnson', 'Al Lawrence', 'Carlos Hill', 'Keith Heard'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        },
        {
          season: 'Winter',
          line: 'The Hellafied Five',
          description: 'Zeta Iota Winter 1976',
          names: ['Steve Reynolds', 'Marvin Hightower', 'Clifton Harris', 'Wendel Owens', 'Edwin Aaron'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1977: [
        {
          season: 'Spring',
          line: 'The One Karat Diamond',
          description: 'Zeta Iota Spring 1977',
          names: ['John Chancey'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        },
        {
          season: 'Fall',
          line: 'The Kaptivating Trio of Konquest',
          description: 'Zeta Iota Fall 1977',
          names: ['Charles Ross', 'Keith Johnson', 'Joe McCall'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1978: [
        {
          season: 'Fall',
          line: 'The Krimson Knight',
          description: 'Zeta Iota Fall 1978',
          names: ['Marvin Nunnally'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      1979: [
        {
          season: 'Spring',
          line: 'The Krimson Kid',
          description: 'Zeta Iota Spring 1979',
          names: ['Ronnie Smith'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        },
        {
          season: 'Fall',
          line: 'The One Diamond in Paradise',
          description: 'Zeta Iota Fall 1979',
          names: ['Walter Allen Jr.'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        },
        {
          season: 'Winter',
          line: 'The Three The Hard Way',
          description: 'Zeta Iota Winter 1979',
          names: ['D.J. Jones', 'Michael Hightower', 'Bennie Hubbard'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1980: [
        {
          season: 'Winter',
          line: 'The Three Disciples of the Diamond',
          description: 'Zeta Iota Winter 1980',
          names: ['Micah Penn', 'James Brown'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        },
        {
          season: 'Spring',
          line: 'The Six Omnipotent Stars',
          description: 'Zeta Iota Spring 1980',
          names: ['Robert Carrol', 'Guy McIntrye', 'Dale Carver'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        },
        {
          season: 'Fall',
          line: 'The Genesis II',
          description: 'Zeta Iota Fall 1980',
          names: ['Gregory Roseberry', 'Herman Johnson', 'Richy Hairston', 'William Renfroe', 'Reginald Dawson', 'Ronald Schofield'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      1981: [
        {
          season: 'Winter',
          line: 'The T.N.T',
          description: 'Zeta Iota Winter 1981',
          names: ['Jeffrey Wakefield', 'Scott Williams'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        },
        {
          season: 'Fall',
          line: 'The Double Jeopardy',
          description: 'Zeta Iota Fall 1981',
          names: ['Wallace Norman', 'Darryl Gardner', 'Calvin Jordan'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      1982: [
        {
          season: 'Spring',
          line: 'The 13 Lords of The Diamond',
          description: 'Zeta Iota Spring 1982',
          names: ['Gerald Anderson', 'Warren Smith', 'Mark Cleveland', 'Robert Doctor', 'Roosevelt Stripling', 'Adolphus Baker III', 'Jeffrey Allen', 'Gregory Young', 'Howard Stroud Jr.', 'Eric Borders', 'Darryl Jones', 'Stephen Starks', 'Derek Bottoms'],
          images: ['images/zi-lineage/1982-1.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1983: [
        {
          season: 'Spring',
          line: 'The 20 Masters of Defiance',
          description: 'Zeta Iota Spring 1983',
          names: ['Tyrone Gonder', 'Kenny Crooks', 'Ricky Parks', 'Arthur Ballard', 'Morris Williams', 'Pete Meadows', 'David Nowell', 'Gregory Fowler', 'Kimothy Woods', 'David Schell', 'Darryl James', 'Anthony Flack', 'Reginald Ross', 'Donald Harty', 'Richard Unda', 'Charles Bennafield', 'Royce Jones', 'Jacob Richardson', 'Freddie Gilbert', 'Lamar Heard'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      1984: [
        {
          season: 'Spring',
          line: 'The 10 Below Zero',
          description: 'Zeta Iota Spring 1984',
          names: ['Danny "The Rock" Davenport', 'Stacey "Suave" Favors', 'Yul Holloway', 'Anthony "AMP" Powers', 'Sidney Woods', 'Erwin Bligen', 'Eric "The General" Norman', 'Ozell "Zeus" Freeman', 'Carey "Cool C" Parrott', 'Andre Mackey'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1985: [
        {
          season: 'Winter',
          line: 'The Five Undeniable Knights of Konquest',
          description: 'Zeta Iota Winter 1985',
          names: ['Chris Williams', 'Albert Stokes', 'Ronnie Witcher', 'William Collins', 'Alonza Woods'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      1986: [
        {
          season: 'Spring',
          line: 'The Triskedecaphilia',
          description: 'Zeta Iota Spring 1986',
          names: ['Michael Kennedy', 'Brett Collier', 'James Robinson', 'Anthony Tucker', 'Jonathan Williams', 'Brian Williams', 'Herbert Harriott', 'Garvell Morris', 'Kenneth Jackson', 'Clarence Smith', 'Eric A. Robinson', 'Eric M. Robinson', 'Kellette Isom'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1987: [
        {
          season: 'Winter',
          line: 'The Solo Brother',
          description: 'Zeta Iota Winter 1987',
          names: ['Aaron Campbell'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        },
        {
          season: 'Fall',
          line: 'The Five Czars of the Krimson Dynasty',
          description: 'Zeta Iota Fall 1987',
          names: ['Derrick Lee', 'Anthony Walker', 'Floyd Means', 'Kenneth Cook', 'Adrian L. Patrick'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1988: [
        {
          season: 'Spring',
          line: 'The Ten Flames of Krimson Fire',
          description: 'Zeta Iota Spring 1988',
          names: ['Steve Brown', 'Yarman Hardy', 'Grady Roberts', 'Mareio Fraley', 'Thaddeus Broadnax', 'Edward Tarlton', 'Adrian Hart', 'Derick Long', 'Alford MacKenzie', 'Reggie Sullivan'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      1989: [
        {
          season: 'Fall',
          line: 'The Dirty Dozen',
          description: 'Zeta Iota Fall 1989',
          names: ['Xavier Moore', 'David Jenkins', 'Joe Campbell', 'Cedric Bolden', 'David MacIntyre', 'Eric Houston', 'Alfred Ponder', 'Clancy Murray', 'J. Martin Lett', 'Thomas Harrison', 'Tyrone James', 'Brian Calhoun'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1990: [
        {
          season: 'Spring',
          line: 'The 13 N.U.P.E',
          description: 'Zeta Iota Spring 1990',
          names: ['Jeff Moss', 'Virgil Roberson', 'Andre Heckstall', 'Winston Campbell', 'Dwayne Morris', 'Kendall Dunson', 'Frank McCrary', 'Roderick Williams', 'Anthony Monroe', 'Russell Hearns', 'Richard Reed', 'Reginald Jackson', 'Damon Evans'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      1991: [
        {
          season: 'Spring',
          line: 'The 8 Diamonds of Destuction',
          description: 'Zeta Iota Spring 1991',
          names: ['Jermaine McClain', 'Tracey Green', 'Dexter Johnigan', 'Patrick Reeves', 'Al Jackson', 'Yaran Hardy', 'Hiawatu Berry', 'George Brewer'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1992: [
        {
          season: 'Spring',
          line: 'The Koup d\'etat',
          description: 'Zeta Iota Spring 1992',
          names: ['Willie Jennings', 'Corey Moore', 'Richard Williams', 'Eric Wiggins', 'Shan Daniels', 'Wiley Cook', 'Rico Atkins'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      1993: [
        {
          season: 'Spring',
          line: 'The Total Kaos',
          description: 'Zeta Iota Spring 1993',
          names: ['Jonathan Jones', 'James Lattimore', 'Dexter Clark', 'Derrick McLester', 'Lemont Williamson', 'Shawn Jones', 'Danjama Gaskins', 'Carlos Willis', 'Jermaine Forbes', 'Kirk Newkirt'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      1998: [
        {
          season: 'Fall',
          line: 'The 21 Knights of the Nu Testament',
          description: 'Zeta Iota Fall 1998',
          names: ['Steven R. Kenner', 'Ethan K. Allen', 'A. Kwaku Agyekum', 'Christian B. Walker', 'Theoplus F. Mack', 'Benjamin E. Shaw', 'Samir B. Damani', 'Derrick P. Bray', 'George L. Brown', 'Richard C. Green', 'Andrew D. Vaugh III', 'Garreth L. Adams', 'Damon V. Anders', 'Michael J. Mixon', 'Robert E. Williams', 'Kerry J. Blue', 'Keon D. Odum', 'Kelvin M. Samuel', 'Barney W. Young Jr.', 'Godfrey O. Powell Jr.', 'Errick J. Crawford'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      1999: [
        {
          season: 'Fall',
          line: 'The 5 Diamonds of Korruption',
          description: 'Zeta Iota Fall 1999',
          names: ['Quantel D. Gibson', 'Brandon T. Swain', 'Shalamar J. Dunn', 'Paul G. Harden Jr.', 'Roderick L. Hurt'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      2000: [
        {
          season: 'Spring',
          line: 'The Prophecy: 4 Heirs to the Kingdom',
          description: 'Zeta Iota Spring 2000',
          names: ['Christopher Williams', 'Harold R. Blackwell', 'Frank J. Butler', 'Kareem Haskett'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        },
        {
          season: 'Fall',
          line: 'The 6 Elements of the Krimson Konspiracy',
          description: 'Zeta Iota Fall 2000',
          names: ['Azeem O. Oladunjoye', 'Jacques A. Bell', 'Jabaris D. Swain', 'Brian L. Moore', 'Teran R. Frith', 'Todjide S. Evans'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      2002: [
        {
          season: 'Spring',
          line: 'The G.L.A.D.I.A.T.O.R.S: 7 Resurrectors of the Flame',
          description: 'Zeta Iota Spring 2002',
          names: ['Russell T. Gregory', 'Thelbert Snowden Jr.', 'Eric L. Bland', 'Travante Wilson', 'Sean Crane', 'Albert H. Hollis II', 'Eric Goldson'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      2003: [
        {
          season: 'Spring',
          line: 'The Five Regulators of the Krimson Kingdom',
          description: 'Zeta Iota Spring 2003',
          names: ['Terry H Thompson', 'Hardray J. Dumas', 'Rodricus A. Ficklin', 'Antwoin J. Clowers', 'Bryan D. Thompson'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      2004: [
        {
          season: 'Spring',
          line: 'The Four Unkut Diamonds in the Rough',
          description: 'Zeta Iota Spring 2004',
          names: ['Bryan K. Arnold', 'Trevor S. Sarter', 'Kevin D. Wilson', 'Nicholas Bedford'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      2005: [
        {
          season: 'Spring',
          line: 'The Five Outlaws of the Kontroversial Diamond',
          description: 'Zeta Iota Spring 2005',
          names: ['Roy Oliver', 'Colby Gardner', 'Nikul Parikh', 'Tra Battle', 'Adarius Tinch'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      2006: [
        {
          season: 'Spring',
          line: 'The Six Soldiers of the Krimson Kartel',
          description: 'Zeta Iota Spring 2006',
          names: ['Alonzo B Hall', 'JC Walton', 'Monte Ponder', 'Duran Gates', 'Juan Herrera', 'James Hancock III'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      2007: [
        {
          season: 'Spring',
          line: 'The Seven K.R.O.O.K.S of the Kasanostra',
          description: 'Zeta Iota Spring 2007',
          names: ['Ryan Carty', 'Brandon Chennault', 'Ryan Catchings', 'Generro Walker', 'Darryl Tricksey', 'Chima Mbadugha', 'Milton "BJ" Lewis'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      2008: [
        {
          season: 'Spring',
          line: 'The Nine Kings of Krimson Royale',
          description: 'Zeta Iota Spring 2008',
          names: ['Ryan Collins', 'David Henderson', 'Mikel Dambreville', 'Amar Parikh', 'Jarrod Brown', 'Justin Foster', 'Jeremy Reynolds', 'Quintin Banks', 'Trinton Sturdivant'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      2009: [
        {
          season: 'Spring',
          line: 'The 4 Spartans of the Krimson Apokalypse',
          description: 'Zeta Iota Spring 2009',
          names: ['Paul Adeyemi', 'Ronald "Ares" Moses', 'Brandon Lovelace', 'Richard Samuel'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      2010: [
        {
          season: 'Spring',
          line: 'The 5 Krusaders of the ZI Legacy',
          description: 'Zeta Iota Spring 2010',
          names: ['Frank Aguebor', 'Damanuel "Director\'s Kut" Richardson', 'Blake "Main Attraktion" Williams', 'Nekabari "Politcally Korrect" Goka', 'Chris "II" Okonkwo-Attiah'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      2011: [
        {
          season: 'Spring',
          line: 'The 4 AdvoKaters Of the Nu Jack Revolution',
          description: 'Zeta Iota Spring 2011',
          names: ['Aamir "Primetime" White', 'Michale "N 2 Deep" Adams', 'Kentrez "Kill Switch" Thompson', 'Brandon "Lethal Weapon" Hamm'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      2012: [
        {
          season: 'Spring',
          line: 'The 7 Assassins of the Krimson Kreed',
          description: 'Zeta Iota Spring 2012',
          names: ['John "Kardiak Arrest" Wood', 'Rictavious "Stone Kold" Bowens', 'Robert "Psi-Kotic" Ellis', 'Raheem "Kwiet Storm" Thompson', 'Jason "Sir-Rokk" Moffitt II', 'Acarre "G-Kue" Patton', 'Kourtland "Kashin\' Out" Jones'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      2013: [
        {
          season: 'Spring',
          line: 'The 6 K.O.N.S. of the Krimson Heist',
          description: 'Zeta Iota Spring 2013',
          names: ['Nicholas "Klarke Kent" Pope', 'Fakari "Kryptonite" Gresham', 'Ugo "Kamouflage" Okeke', 'Victor "Komeback Kid" Walker', 'Austin "Kritical Kondition" Johnson', 'Julian "Kollateral Damage" Hoyle'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      2017: [
        {
          season: 'Spring',
          line: 'The Eight Resurrektors of the ZI Legacy',
          description: 'Zeta Iota Spring 2017',
          names: ['John "Kommander In Khief" Adeyimi', 'Cory "Strikkly Business" Carter', 'James "Kause N Effekt" Artemus', 'Lamar Fletcher', 'Abel "NovaKane" Belete', 'Bobby "First Klass" Sarpong', 'Steven "Pure Kocaine" VanTiflin', 'Andrew "Kase Klosed" Troy'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      2018: [
        {
          season: 'Spring',
          line: 'The 11 H.I.T.M.E.N of the Krimson Mafia',
          description: 'Zeta Iota Spring 2018',
          names: ['Justin Nixon', 'Cejhae Greene', 'Trey Grant', 'Ian Mcintyre', 'Jordan Vaughn', 'KJ Smith', 'Jordan McGruder', 'Endalkachew Ferede', 'Michael Chigbu', 'Michael Earl', 'Malik King'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      2019: [
        {
          season: 'Fall',
          line: 'The 9 Ambassadors of the ZI Regime',
          description: 'Zeta Iota Fall 2019',
          names: ['Bryant Bolds II', 'Matthew Meadows', 'Joshua Bennafield', 'Maurice Peoples Jr.', 'Jalen Polk', 'Brandon Marshall', 'Julianel Roman', 'Michael Nicholls', 'Adrian Thomas Jr'],
          images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
        }
      ],
      2020: [
        {
          season: 'Spring',
          line: 'The Zeta Iota Spring 2020',
          description: 'Zeta Iota Spring 2020',
          names: ['Dwight Coles III', 'Chazz Lezama-Francois', 'Tyler Fullwood', 'Brandon Trowel', 'Channing Tindall'],
          images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      2024: [
        {
          season: 'Fall',
          line: 'The 8 Fugitives of the ZI Asylum',
          description: 'Zeta Iota Fall 2024',
          names: ['Corey Straughter', 'Matthew Turnipseed', 'Grady Taylor III', 'Kyle Singer', 'Luke Williams', 'Semon Teklemariam', 'Kaleb Quince', 'Ronald Brown III'],
          images: ['images/zi-lineage/fall2024-1.jpg', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ],
      2025: [
        {
          season: 'Spring',
          line: 'The 8 Enforcers of the ZI Coalition',
          description: 'Zeta Iota Spring 2025',
          names: ['Braylen Howell', 'Travis Burton', 'Demetri Hatten', 'Cameron Webb', 'Coleson Bowen', 'Victor Young', 'Myles Cutter', 'Temiloluwa Ojedapo'],
          images: ['images/homepage1.JPG', 'images/zi-logo.png', 'images/klassikcity.png']
        }
      ]
    };

    // Build the timeline from 2025 down to 1971
    const lines = [];

    for (let year = 2025; year >= 1971; year -= 1) {
      if (actualLines[year]) {
        // This year has line(s)
        actualLines[year].forEach((lineData) => {
          lines.push({
            year,
            season: lineData.season,
            line: lineData.line,
            description: lineData.description,
            names: lineData.names,
            images: lineData.images
          });
        });
      }
    }

    function openHistoryPanel(lineData) {
      if (!detailPanel) return;

      detailYear.textContent = `${lineData.season} ${lineData.year}`;
      detailLine.textContent = lineData.line;
      detailDescription.textContent = lineData.description;

      detailNames.innerHTML = lineData.names.map((name) => `<li>${name}</li>`).join('');
      detailGallery.innerHTML = lineData.images
        .map((img, index) => `<img src="${img}" alt="${lineData.line} photo ${index + 1}" loading="lazy" decoding="async">`)
        .join('');

      detailPanel.classList.add('active');
      detailPanel.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeHistoryPanel() {
      if (!detailPanel) return;
      detailPanel.classList.remove('active');
      detailPanel.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    lines.forEach((lineData) => {
      const card = document.createElement('article');
      card.className = 'history-card';
      card.setAttribute('role', 'listitem');

      card.innerHTML = `
        <button type="button" aria-label="Open ${lineData.line} details for ${lineData.season} ${lineData.year}">
          <img class="history-card-image" src="${lineData.images[0]}" alt="${lineData.line}" loading="lazy" decoding="async">
          <div class="history-card-content">
            <p class="history-card-year">${lineData.season} ${lineData.year}</p>
            <p class="history-card-line">${lineData.line}</p>
          </div>
        </button>
      `;

      const button = card.querySelector('button');
      if (button) {
        button.addEventListener('click', () => openHistoryPanel(lineData));
      }

      historyTimeline.appendChild(card);
    });

    if (closePanelBtn) {
      closePanelBtn.addEventListener('click', closeHistoryPanel);
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && detailPanel?.classList.contains('active')) {
        closeHistoryPanel();
      }
    });
  }
}); 