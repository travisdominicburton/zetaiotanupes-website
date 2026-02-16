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
        line: 'Sadistic Sixteen',
        description: 'The sixteen charter members of the Zeta Iota Chapter of Kappa Alpha Psi Fraternity, Incorporated, laid a foundation that would forever shape the legacy and impact of the fraternity within this community. Their vision, courage, and commitment to achievement in every field of human endeavor brought to life a brotherhood rooted in purpose, scholarship, service, and leadership. Establishing the Zeta Iota Chapter here was more than the creation of a collegiate organization—it was the planting of a standard of excellence, unity, and perseverance that would uplift generations to come. In founding this chapter, these sixteen men created a lasting presence dedicated to mentorship, community engagement, and the development of strong, principled leaders. Their decision to charter Zeta Iota in this location stands as a testament to their belief in the power of brotherhood and their unwavering commitment to leaving a meaningful and enduring legacy.',
        names: ['Regero Samspon', 'Ric Gilmore', 'Henry Childs', 'JuDonn Adams', 'Donald Perry', 'James Harvey', 'Joe Ripley', 'Vernon Neely', 'Charles Benton', 'Joe Tate', 'Ralph Bryant', 'Levert Hood', 'Sam Smiley', 'William Kennedy', 'Jackie Davis', 'Jeff Brooks'],
        images: ['images/zi-lineage/sadisticsixteen.png', 'images/zi-lineage/1971-1.jpg', 'images/zi-lineage/1971-2.jpg']
      }
    ],
    1972: [
      {
        season: 'Spring',
        line: 'Seven Pains of Judas',
        description: 'Seven brothers who continued the legacy.',
        names: ['Thomas Bush', 'Ken Lloyd', 'Larry West', 'Richard Dunn', 'Robert Kinnebrew', 'Harold Moon', 'Gerald Bailey'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      },
      {
        season: 'Fall',
        line: 'Sweetback\'s BadAsss Six',
        description: 'Six brothers representing strength and unity.',
        names: ['Tony Williamson', 'James Brown', 'Calvin Atkinson', 'Horace King', 'Chris Turner', 'Cedrick Knight'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1973: [
      {
        season: 'Spring',
        line: 'Inseparable Seven',
        description: 'Seven brothers bound by unbreakable brotherhood.',
        names: ['Lorenzo Anderson', 'Mark Hawker', 'Dennis McCluster', 'Danny Thomas', 'Raburn Josey', 'Anthony James', 'Lorenzo Jones'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      },
      {
        season: 'Fall',
        line: 'Watt Stax Four Pack',
        description: 'Four brothers representing excellence.',
        names: ['Willie Brown', 'Ricky Hudson', 'Fred Wilson', 'Ricky Vibens'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1974: [
      {
        season: 'Winter',
        line: 'Double Dimension',
        description: 'Two brothers bringing new perspectives.',
        names: ['Gary Dalton', 'Greg Hill'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    1975: [
      {
        season: 'Spring',
        line: 'Ace of Diamond',
        description: 'A singular brother representing excellence.',
        names: ['Gene Mays'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1976: [
      {
        season: 'Fall',
        line: 'Four Oracles of Delphi',
        description: 'Four wise brothers guiding the chapter.',
        names: ['Conner Johnson', 'Al Lawrence', 'Carlos Hill', 'Keith Heard'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      },
      {
        season: 'Winter',
        line: 'Hellafied Five',
        description: 'Five brothers bringing intensity and excellence.',
        names: ['Steve Reynolds', 'Marvin Hightower', 'Clifton Harris', 'Wendel Owens', 'Edwin Aaron'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1977: [
      {
        season: 'Spring',
        line: 'One Karat Diamond',
        description: 'A precious addition to the chapter.',
        names: ['John Chancey'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      },
      {
        season: 'Fall',
        line: 'Kaptivating Trio of Konquest',
        description: 'Three brothers conquering new heights.',
        names: ['Charles Ross', 'Keith Johnson', 'Joe McCall'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1978: [
      {
        season: 'Fall',
        line: 'Krimson Knight',
        description: 'A lone warrior upholding the tradition.',
        names: ['Marvin Nunnally'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    1979: [
      {
        season: 'Spring',
        line: 'Krimson Kid',
        description: 'A young brother with great promise.',
        names: ['Ronnie Smith'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      },
      {
        season: 'Fall',
        line: 'One Diamond in Paradise',
        description: 'A rare gem in the brotherhood.',
        names: ['Walter Allen Jr.'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      },
      {
        season: 'Winter',
        line: 'Three The Hard Way',
        description: 'Three brothers overcoming challenges together.',
        names: ['D.J. Jones', 'Michael Hightower', 'Bennie Hubbard'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1980: [
      {
        season: 'Winter',
        line: 'Three Disciples of the Diamond',
        description: 'Three devoted brothers.',
        names: ['Micah Penn', 'James Brown'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      },
      {
        season: 'Spring',
        line: 'Six Omnipotent Stars',
        description: 'Six powerful brothers shining bright.',
        names: ['Robert Carrol', 'Guy McIntrye', 'Dale Carver'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      },
      {
        season: 'Fall',
        line: 'Genesis II',
        description: 'A new beginning for the chapter.',
        names: ['Gregory Roseberry', 'Herman Johnson', 'Richy Hairston', 'William Renfroe', 'Reginald Dawson', 'Ronald Schofield'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    1981: [
      {
        season: 'Winter',
        line: 'T.N.T',
        description: 'Explosive talent joining the brotherhood.',
        names: ['Jeffrey Wakefield', 'Scott Williams'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      },
      {
        season: 'Fall',
        line: 'Double Jeopardy',
        description: 'Three brothers bringing double the impact.',
        names: ['Wallace Norman', 'Darryl Gardner', 'Calvin Jordan'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    1982: [
      {
        season: 'Spring',
        line: '13 Lords of The Diamond',
        description: 'Thirteen brothers ruling with excellence.',
        names: ['Gerald Anderson', 'Warren Smith', 'Mark Cleveland', 'Robert Doctor', 'Roosevelt Stripling', 'Adolphus Baker III', 'Jeffrey Allen', 'Gregory Young', 'Howard Stroud Jr.', 'Eric Borders', 'Darryl Jones', 'Stephen Starks', 'Derek Bottoms'],
        images: ['images/zi-lineage/1982-1.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1983: [
      {
        season: 'Spring',
        line: '20 Masters of Defiance',
        description: 'Twenty brothers defying expectations.',
        names: ['Tyrone Gonder', 'Kenny Crooks', 'Ricky Parks', 'Arthur Ballard', 'Morris Williams', 'Pete Meadows', 'David Nowell', 'Gregory Fowler', 'Kimothy Woods', 'David Schell', 'Darryl James', 'Anthony Flack', 'Reginald Ross', 'Donald Harty', 'Richard Unda', 'Charles Bennafield', 'Royce Jones', 'Jacob Richardson', 'Freddie Gilbert', 'Lamar Heard'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    1984: [
      {
        season: 'Spring',
        line: '10 Below Zero',
        description: 'Ten cool brothers bringing heat to the chapter.',
        names: ['Danny "The Rock" Davenport', 'Stacey "Suave" Favors', 'Yul Holloway', 'Anthony "AMP" Powers', 'Sidney Woods', 'Erwin Bligen', 'Eric "The General" Norman', 'Ozell "Zeus" Freeman', 'Carey "Cool C" Parrott', 'Andre Mackey'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1985: [
      {
        season: 'Winter',
        line: 'Five Undeniable Knights of Konquest',
        description: 'Five knights conquering new territory.',
        names: ['Chris Williams', 'Albert Stokes', 'Ronnie Witcher', 'William Collins', 'Alonza Woods'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    1986: [
      {
        season: 'Spring',
        line: 'Triskedecaphilia',
        description: 'Thirteen brothers embracing the challenge.',
        names: ['Michael Kennedy', 'Brett Collier', 'James Robinson', 'Anthony Tucker', 'Jonathan Williams', 'Brian Williams', 'Herbert Harriott', 'Garvell Morris', 'Kenneth Jackson', 'Clarence Smith', 'Eric A. Robinson', 'Eric M. Robinson', 'Kellette Isom'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1987: [
      {
        season: 'Winter',
        line: 'Solo Brother',
        description: 'One brother standing strong.',
        names: ['Aaron Campbell'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      },
      {
        season: 'Fall',
        line: 'Five Czars of the Krimson Dynasty',
        description: 'Five rulers of the Krimson empire.',
        names: ['Derrick Lee', 'Anthony Walker', 'Floyd Means', 'Kenneth Cook', 'Adrian L. Patrick'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1988: [
      {
        season: 'Spring',
        line: 'Ten Flames of Krimson Fire',
        description: 'Ten brothers igniting passion and excellence.',
        names: ['Steve Brown', 'Yarman Hardy', 'Grady Roberts', 'Mareio Fraley', 'Thaddeus Broadnax', 'Edward Tarlton', 'Adrian Hart', 'Derick Long', 'Alford MacKenzie', 'Reggie Sullivan'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    1989: [
      {
        season: 'Fall',
        line: 'The Dirty Dozen',
        description: 'Twelve brothers ready for action.',
        names: ['Xavier Moore', 'David Jenkins', 'Joe Campbell', 'Cedric Bolden', 'David MacIntyre', 'Eric Houston', 'Alfred Ponder', 'Clancy Murray', 'J. Martin Lett', 'Thomas Harrison', 'Tyrone James', 'Brian Calhoun'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1990: [
      {
        season: 'Spring',
        line: '13 N.U.P.E',
        description: 'Thirteen brothers representing true NUPE spirit.',
        names: ['Jeff Moss', 'Virgil Roberson', 'Andre Heckstall', 'Winston Campbell', 'Dwayne Morris', 'Kendall Dunson', 'Frank McCrary', 'Roderick Williams', 'Anthony Monroe', 'Russell Hearns', 'Richard Reed', 'Reginald Jackson', 'Damon Evans'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    1991: [
      {
        season: 'Spring',
        line: '8 Diamonds of Destuction',
        description: 'Eight brothers bringing powerful change.',
        names: ['Jermaine McClain', 'Tracey Green', 'Dexter Johnigan', 'Patrick Reeves', 'Al Jackson', 'Yaran Hardy', 'Hiawatu Berry', 'George Brewer'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1992: [
      {
        season: 'Spring',
        line: 'Koup d\'etat',
        description: 'Seven brothers staging a powerful takeover.',
        names: ['Willie Jennings', 'Corey Moore', 'Richard Williams', 'Eric Wiggins', 'Shan Daniels', 'Wiley Cook', 'Rico Atkins'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    1993: [
      {
        season: 'Spring',
        line: 'Total Kaos',
        description: 'Ten brothers bringing controlled chaos.',
        names: ['Jonathan Jones', 'James Lattimore', 'Dexter Clark', 'Derrick McLester', 'Lemont Williamson', 'Shawn Jones', 'Danjama Gaskins', 'Carlos Willis', 'Jermaine Forbes', 'Kirk Newkirt'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    1998: [
      {
        season: 'Fall',
        line: '21 Knights of the Nu Testament',
        description: 'Twenty-one brothers writing a new chapter.',
        names: ['Steven R. Kenner', 'Ethan K. Allen', 'A. Kwaku Agyekum', 'Christian B. Walker', 'Theoplus F. Mack', 'Benjamin E. Shaw', 'Samir B. Damani', 'Derrick P. Bray', 'George L. Brown', 'Richard C. Green', 'Andrew D. Vaugh III', 'Garreth L. Adams', 'Damon V. Anders', 'Michael J. Mixon', 'Robert E. Williams', 'Kerry J. Blue', 'Keon D. Odum', 'Kelvin M. Samuel', 'Barney W. Young Jr.', 'Godfrey O. Powell Jr.', 'Errick J. Crawford'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    1999: [
      {
        season: 'Fall',
        line: '5 Diamonds of Korruption',
        description: 'Five brothers bringing Krimson excellence.',
        names: ['Quantel D. Gibson', 'Brandon T. Swain', 'Shalamar J. Dunn', 'Paul G. Harden Jr.', 'Roderick L. Hurt'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    2000: [
      {
        season: 'Spring',
        line: 'Prophecy: 4 Heirs to the Kingdom',
        description: 'Four brothers fulfilling the prophecy.',
        names: ['Christopher Williams', 'Harold R. Blackwell', 'Frank J. Butler', 'Kareem Haskett'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      },
      {
        season: 'Fall',
        line: '6 Elements of the Krimson Konspiracy',
        description: 'Six brothers conspiring for greatness.',
        names: ['Azeem O. Oladunjoye', 'Jacques A. Bell', 'Jabaris D. Swain', 'Brian L. Moore', 'Teran R. Frith', 'Todjide S. Evans'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    2002: [
      {
        season: 'Spring',
        line: 'G.L.A.D.I.A.T.O.R.S: 7 Resurrectors of the Flame',
        description: 'Seven gladiators resurrecting the legacy.',
        names: ['Russell T. Gregory', 'Thelbert Snowden Jr.', 'Eric L. Bland', 'Travante Wilson', 'Sean Crane', 'Albert H. Hollis II', 'Eric Goldson'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    2003: [
      {
        season: 'Spring',
        line: 'Five Regulators of the Krimson Kingdom',
        description: 'Five brothers regulating excellence.',
        names: ['Terry H Thompson', 'Hardray J. Dumas', 'Rodricus A. Ficklin', 'Antwoin J. Clowers', 'Bryan D. Thompson'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    2004: [
      {
        season: 'Spring',
        line: 'Four Unkut Diamonds in the Rough',
        description: 'Four uncut gems polished by brotherhood.',
        names: ['Bryan K. Arnold', 'Trevor S. Sarter', 'Kevin D. Wilson', 'Nicholas Bedford'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    2005: [
      {
        season: 'Spring',
        line: 'Five Outlaws of the Kontroversial Diamond',
        description: 'Five brothers breaking the mold.',
        names: ['Roy Oliver', 'Colby Gardner', 'Nikul Parikh', 'Tra Battle', 'Adarius Tinch'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    2006: [
      {
        season: 'Spring',
        line: 'Six Soldiers of the Krimson Kartel',
        description: 'Six soldiers enforcing Krimson standards.',
        names: ['Alonzo B Hall', 'JC Walton', 'Monte Ponder', 'Duran Gates', 'Juan Herrera', 'James Hancock III'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    2007: [
      {
        season: 'Spring',
        line: 'Seven K.R.O.O.K.S of the Kasanostra',
        description: 'Seven brothers of the Krimson family.',
        names: ['Ryan Carty', 'Brandon Chennault', 'Ryan Catchings', 'Generro Walker', 'Darryl Tricksey', 'Chima Mbadugha', 'Milton "BJ" Lewis'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    2008: [
      {
        season: 'Spring',
        line: 'The Nine Kings of Krimson Royale',
        description: 'Nine kings ruling with dignity.',
        names: ['Ryan Collins', 'David Henderson', 'Mikel Dambreville', 'Amar Parikh', 'Jarrod Brown', 'Justin Foster', 'Jeremy Reynolds', 'Quintin Banks', 'Trinton Sturdivant'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    2009: [
      {
        season: 'Spring',
        line: '4 Spartans of the Krimson Apokalypse',
        description: 'Four Spartan warriors.',
        names: ['Paul Adeyemi', 'Ronald "Ares" Moses', 'Brandon Lovelace', 'Richard Samuel'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    2010: [
      {
        season: 'Spring',
        line: '5 Krusaders of the ZI Legacy',
        description: 'Five crusaders protecting the legacy.',
        names: ['Frank Aguebor', 'Damanuel "Director\'s Kut" Richardson', 'Blake "Main Attraktion" Williams', 'Nekabari "Politcally Korrect" Goka', 'Chris "II" Okonkwo-Attiah'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    2011: [
      {
        season: 'Spring',
        line: 'The 4 AdvoKaters Of the Nu Jack Revolution',
        description: 'Four advocates of revolutionary change.',
        names: ['Aamir "Primetime" White', 'Michale "N 2 Deep" Adams', 'Kentrez "Kill Switch" Thompson', 'Brandon "Lethal Weapon" Hamm'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    2012: [
      {
        season: 'Spring',
        line: '7 Assassins of the Krimson Kreed',
        description: 'Seven assassins executing perfection.',
        names: ['John "Kardiak Arrest" Wood', 'Rictavious "Stone Kold" Bowens', 'Robert "Psi-Kotic" Ellis', 'Raheem "Kwiet Storm" Thompson', 'Jason "Sir-Rokk" Moffitt II', 'Acarre "G-Kue" Patton', 'Kourtland "Kashin\' Out" Jones'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    2013: [
      {
        season: 'Spring',
        line: 'The 6 K.O.N.S. of the Krimson Heist',
        description: 'Six cons pulling off the perfect heist.',
        names: ['Nicholas "Klarke Kent" Pope', 'Fakari "Kryptonite" Gresham', 'Ugo "Kamouflage" Okeke', 'Victor "Komeback Kid" Walker', 'Austin "Kritical Kondition" Johnson', 'Julian "Kollateral Damage" Hoyle'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    2017: [
      {
        season: 'Spring',
        line: 'Eight Resurrektors of the ZI Legacy',
        description: 'Eight brothers resurrecting the ZI tradition.',
        names: ['John "Kommander In Khief" Adeyimi', 'Cory "Strikkly Business" Carter', 'James "Kause N Effekt" Artemus', 'Lamar Fletcher', 'Abel "NovaKane" Belete', 'Bobby "First Klass" Sarpong', 'Steven "Pure Kocaine" VanTiflin', 'Andrew "Kase Klosed" Troy'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    2018: [
      {
        season: 'Spring',
        line: '11 H.I.T.M.E.N of the Kappa Mafia',
        description: 'Eleven hitmen of the brotherhood.',
        names: ['Justin Nixon', 'Cejhae Greene', 'Trey Grant', 'Ian Mcintyre', 'Jordan Vaughn', 'KJ Smith', 'Jordan McGruder', 'Endalkachew Ferede', 'Michael Chigbu', 'Michael Earl', 'Malik King'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    2019: [
      {
        season: 'Fall',
        line: 'Ambassadors of the ZI Regime',
        description: 'Nine ambassadors representing ZI excellence.',
        names: ['Bryant Bolds II', 'Matthew Meadows', 'Joshua Bennafield', 'Maurice Peoples Jr.', 'Jalen Polk', 'Brandon Marshall', 'Julianel Roman', 'Michael Nicholls', 'Adrian Thomas Jr'],
        images: ['images/zi-logo.png', 'images/klassikcity.png', 'images/zi-logo.png']
      }
    ],
    2020: [
      {
        season: 'Spring',
        line: 'The Five Survivors of the ZI Barrikade',
        description: 'Five brothers surviving and thriving through challenges.',
        names: ['Dwight Coles III', 'Chazz Lezama-Francois', 'Tyler Fullwood', 'Brandon Trowel', 'Channing Tindall'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    2024: [
      {
        season: 'Fall',
        line: 'The Five Survivors of the ZI Barrikade',
        description: 'Five brothers surviving and thriving through challenges.',
        names: ['Dwight Coles III', 'Chazz Lezama-Francois', 'Tyler Fullwood', 'Brandon Trowel', 'Channing Tindall'],
        images: ['images/klassikcity.png', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ],
    2025: [
      {
        season: 'Spring',
        line: 'The 8 Enforcers of the ZI Coalition',
        description: 'Five brothers surviving and thriving through challenges.',
        names: ['Braylen Howell', 'Travis Burton', 'Demetri Hatten', 'Cameron Webb', 'Coleson Bowen', 'Victor Young', 'Myles Cutter', 'Temiloluwa Ojedapo'],
        images: ['images/homepage1.JPG', 'images/zi-logo.png', 'images/klassikcity.png']
      }
    ]
  };

  // Build the timeline from 2020 down to 1971
  const lines = [];
  
  for (let year = 2026; year >= 1971; year -= 1) {
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
}); // End DOMContentLoaded