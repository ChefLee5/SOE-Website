import React, { useState, useEffect, useCallback, useRef } from 'react';
import './bookPreview.css';

/* ═══════════════════════════════════════════════════════════════
 * TABLE OF CONTENTS — Derived from the EPUB spine (content.opf)
 * Each section maps to a Land or Back Matter grouping
 * ═══════════════════════════════════════════════════════════════ */
const TOC = [
    {
        title: 'Front Matter',
        icon: '📖',
        color: '#64748b',
        pages: [
            { file: 'cover.xhtml', label: 'Cover' },
            { file: 'frontmatter.xhtml', label: 'How to Use This Book' },
        ],
    },
    {
        title: 'Land 1 — Harmonia',
        icon: '🎵',
        color: '#d4a843',
        pages: [
            { file: 'land1-greetings-introductions.xhtml', label: 'Greetings & Introductions' },
            { file: 'land1-personal-information.xhtml', label: 'Personal Information' },
            { file: 'land1-family-relationships.xhtml', label: 'Family & Relationships' },
            { file: 'land1-the-classroom.xhtml', label: 'The Classroom' },
            { file: 'land1-emotions-feelings.xhtml', label: 'Emotions & Feelings' },
            { file: 'land1-clothing-getting-dressed.xhtml', label: 'Clothing & Getting Dressed' },
            { file: 'land1-colors-patterns.xhtml', label: 'Colors & Patterns' },
            { file: 'land1-the-home.xhtml', label: 'The Home' },
            { file: 'land1-days-months-numbers.xhtml', label: 'Days, Months & Numbers' },
            { file: 'land1-communication-technology.xhtml', label: 'Communication & Technology' },
            { file: 'land1-manners-politeness.xhtml', label: 'Manners & Politeness' },
            { file: 'land1-daily-routines.xhtml', label: 'Daily Routines' },
            { file: 'land1-hobbies-recreation.xhtml', label: 'Hobbies & Recreation' },
            { file: 'land1-the-playground-recess.xhtml', label: 'The Playground & Recess' },
            { file: 'land1-body-language-gestures.xhtml', label: 'Body Language & Gestures' },
            { file: 'land1-music-instruments.xhtml', label: 'Music & Instruments' },
            { file: 'land1-school-events-activities.xhtml', label: 'School Events & Activities' },
            { file: 'land1-celebrations-traditions.xhtml', label: 'Celebrations & Traditions' },
            { file: 'land1-the-neighborhood.xhtml', label: 'The Neighborhood' },
            { file: 'land1-pets-at-home.xhtml', label: 'Pets at Home' },
        ],
    },
    {
        title: 'Land 2 — Numeria',
        icon: '🔢',
        color: '#7fb685',
        pages: [
            { file: 'land2-numbers-counting.xhtml', label: 'Numbers & Counting' },
            { file: 'land2-basic-math-operations.xhtml', label: 'Basic Math Operations' },
            { file: 'land2-money-currency.xhtml', label: 'Money & Currency' },
            { file: 'land2-the-bank.xhtml', label: 'The Bank' },
            { file: 'land2-the-grocery-store-shopping.xhtml', label: 'The Grocery Store' },
            { file: 'land2-weights-measures.xhtml', label: 'Weights & Measures' },
            { file: 'land2-time-clocks.xhtml', label: 'Time & Clocks' },
            { file: 'land2-charts-graphs.xhtml', label: 'Charts & Graphs' },
            { file: 'land2-shapes-geometry.xhtml', label: 'Shapes & Geometry' },
            { file: 'land2-problem-solving-logic.xhtml', label: 'Problem Solving & Logic' },
            { file: 'land2-fractions-decimals.xhtml', label: 'Fractions & Decimals' },
            { file: 'land2-patterns-sequences.xhtml', label: 'Patterns & Sequences' },
            { file: 'land2-estimation-comparison.xhtml', label: 'Estimation & Comparison' },
            { file: 'land2-cooking-measurements.xhtml', label: 'Cooking Measurements' },
            { file: 'land2-measurement-at-home.xhtml', label: 'Measurement at Home' },
            { file: 'land2-distance-speed.xhtml', label: 'Distance & Speed' },
            { file: 'land2-budget-savings.xhtml', label: 'Budget & Savings' },
            { file: 'land2-calendar-math.xhtml', label: 'Calendar Math' },
            { file: 'land2-data-statistics.xhtml', label: 'Data & Statistics' },
        ],
    },
    {
        title: 'Land 3 — Terrasol',
        icon: '🌿',
        color: '#10B981',
        pages: [
            { file: 'land3-the-barnyard.xhtml', label: 'The Barnyard' },
            { file: 'land3-wild-animals.xhtml', label: 'Wild Animals' },
            { file: 'land3-pets-companions.xhtml', label: 'Pets & Companions' },
            { file: 'land3-the-garden.xhtml', label: 'The Garden' },
            { file: 'land3-trees-the-forest.xhtml', label: 'Trees & The Forest' },
            { file: 'land3-the-environment.xhtml', label: 'The Environment' },
            { file: 'land3-silas-vestas-cottage-outside.xhtml', label: "Silas & Vesta's Cottage" },
            { file: 'land3-inside-the-home.xhtml', label: 'Inside the Home' },
            { file: 'land3-shapes-in-the-world.xhtml', label: 'Shapes in the World' },
            { file: 'land3-farm-to-table.xhtml', label: 'Farm to Table' },
            { file: 'land3-insects-bugs.xhtml', label: 'Insects & Bugs' },
            { file: 'land3-fruits-vegetables.xhtml', label: 'Fruits & Vegetables' },
            { file: 'land3-weather-seasons.xhtml', label: 'Weather & Seasons' },
            { file: 'land3-rocks-minerals.xhtml', label: 'Rocks & Minerals' },
            { file: 'land3-recycling-sustainability.xhtml', label: 'Recycling & Sustainability' },
            { file: 'land3-the-ocean-beach.xhtml', label: 'The Ocean & Beach' },
            { file: 'land3-desert-dry-lands.xhtml', label: 'Desert & Dry Lands' },
            { file: 'land3-rivers-lakes.xhtml', label: 'Rivers & Lakes' },
            { file: 'land3-camping-hiking.xhtml', label: 'Camping & Hiking' },
            { file: 'land3-seeds-growing.xhtml', label: 'Seeds & Growing' },
        ],
    },
    {
        title: 'Land 4 — Aquaria',
        icon: '🌊',
        color: '#2563EB',
        pages: [
            { file: 'land4-the-ocean-marine-life.xhtml', label: 'The Ocean & Marine Life' },
            { file: 'land4-geography-landforms.xhtml', label: 'Geography & Landforms' },
            { file: 'land4-transportation.xhtml', label: 'Transportation' },
            { file: 'land4-the-airport-travel.xhtml', label: 'The Airport & Travel' },
            { file: 'land4-hotels-lodging.xhtml', label: 'Hotels & Lodging' },
            { file: 'land4-directions-navigation.xhtml', label: 'Directions & Navigation' },
            { file: 'land4-weather-climate.xhtml', label: 'Weather & Climate' },
            { file: 'land4-community-places.xhtml', label: 'Community Places' },
            { file: 'land4-tricky-english-words.xhtml', label: 'Tricky English Words' },
            { file: 'land4-seasons-nature-cycles.xhtml', label: 'Seasons & Nature Cycles' },
            { file: 'land4-freshwater-life.xhtml', label: 'Freshwater Life' },
            { file: 'land4-mail-postal-services.xhtml', label: 'Mail & Postal Services' },
            { file: 'land4-emergency-services.xhtml', label: 'Emergency Services' },
            { file: 'land4-road-signs-safety.xhtml', label: 'Road Signs & Safety' },
            { file: 'land4-public-transportation.xhtml', label: 'Public Transportation' },
            { file: 'land4-bicycle-walking.xhtml', label: 'Bicycle & Walking' },
            { file: 'land4-travel-documents.xhtml', label: 'Travel Documents' },
            { file: 'land4-map-reading-gps.xhtml', label: 'Map Reading & GPS' },
            { file: 'land4-restaurants-dining.xhtml', label: 'Restaurants & Dining' },
        ],
    },
    {
        title: 'Land 5 — Vitalis',
        icon: '🤸',
        color: '#c4785a',
        pages: [
            { file: 'land5-the-human-body.xhtml', label: 'The Human Body' },
            { file: 'land5-inside-the-body.xhtml', label: 'Inside the Body' },
            { file: 'land5-the-doctors-office.xhtml', label: "The Doctor's Office" },
            { file: 'land5-the-dentist.xhtml', label: 'The Dentist' },
            { file: 'land5-the-pharmacy.xhtml', label: 'The Pharmacy' },
            { file: 'land5-healthy-habits-hygiene.xhtml', label: 'Healthy Habits & Hygiene' },
            { file: 'land5-the-produce-market.xhtml', label: 'The Produce Market' },
            { file: 'land5-the-kitchen.xhtml', label: 'The Kitchen' },
            { file: 'land5-meal-time.xhtml', label: 'Meal Time' },
            { file: 'land5-exercise-movement.xhtml', label: 'Exercise & Movement' },
            { file: 'land5-nutrition-food-groups.xhtml', label: 'Nutrition & Food Groups' },
            { file: 'land5-mental-health-emotions.xhtml', label: 'Mental Health & Emotions' },
            { file: 'land5-first-aid-injuries.xhtml', label: 'First Aid & Injuries' },
            { file: 'land5-eye-care-vision.xhtml', label: 'Eye Care & Vision' },
            { file: 'land5-sleep-rest.xhtml', label: 'Sleep & Rest' },
            { file: 'land5-personal-care-products.xhtml', label: 'Personal Care Products' },
            { file: 'land5-sports-fitness.xhtml', label: 'Sports & Fitness' },
        ],
    },
    {
        title: 'Land 6 — Sophia',
        icon: '🏛️',
        color: '#5ba4c9',
        pages: [
            { file: 'land6-occupations-careers.xhtml', label: 'Occupations & Careers' },
            { file: 'land6-types-of-workers.xhtml', label: 'Types of Workers' },
            { file: 'land6-the-workplace.xhtml', label: 'The Workplace' },
            { file: 'land6-tools-construction.xhtml', label: 'Tools & Construction' },
            { file: 'land6-safety-emergencies.xhtml', label: 'Safety & Emergencies' },
            { file: 'land6-government-civics.xhtml', label: 'Government & Civics' },
            { file: 'land6-money-management-bills.xhtml', label: 'Money Management & Bills' },
            { file: 'land6-school-subjects-education.xhtml', label: 'School Subjects & Education' },
            { file: 'land6-community-helpers-services.xhtml', label: 'Community Helpers' },
            { file: 'land6-rights-responsibilities.xhtml', label: 'Rights & Responsibilities' },
            { file: 'land6-forms-documents.xhtml', label: 'Forms & Documents' },
            { file: 'land6-housing-renting.xhtml', label: 'Housing & Renting' },
            { file: 'land6-childcare-parenting.xhtml', label: 'Childcare & Parenting' },
            { file: 'land6-legal-court-terms.xhtml', label: 'Legal & Court Terms' },
            { file: 'land6-job-interview-skills.xhtml', label: 'Job Interview Skills' },
            { file: 'land6-resume-applications.xhtml', label: 'Résumé & Applications' },
            { file: 'land6-banking-online-services.xhtml', label: 'Banking & Online Services' },
            { file: 'land6-taxes-filing.xhtml', label: 'Taxes & Filing' },
            { file: 'land6-voting-elections.xhtml', label: 'Voting & Elections' },
        ],
    },
    {
        title: 'Land 7 — Celestia',
        icon: '⏰',
        color: '#9678c4',
        pages: [
            { file: 'land7-the-solar-system.xhtml', label: 'The Solar System' },
            { file: 'land7-planet-earth.xhtml', label: 'Planet Earth' },
            { file: 'land7-energy-forces.xhtml', label: 'Energy & Forces' },
            { file: 'land7-the-water-cycle-weather-systems.xhtml', label: 'The Water Cycle' },
            { file: 'land7-inventions-discoveries.xhtml', label: 'Inventions & Discoveries' },
            { file: 'land7-time-concepts-history.xhtml', label: 'Time Concepts & History' },
            { file: 'land7-the-scientific-method.xhtml', label: 'The Scientific Method' },
            { file: 'land7-the-calendar-cycles.xhtml', label: 'The Calendar & Cycles' },
            { file: 'land7-environment-sustainability.xhtml', label: 'Environment & Sustainability' },
            { file: 'land7-the-future-dreams.xhtml', label: 'The Future & Dreams' },
            { file: 'land7-telling-time-clocks.xhtml', label: 'Telling Time & Clocks' },
            { file: 'land7-ages-life-stages.xhtml', label: 'Ages & Life Stages' },
            { file: 'land7-seasons-time-in-nature.xhtml', label: 'Seasons & Time in Nature' },
            { file: 'land7-historical-timekeeping.xhtml', label: 'Historical Timekeeping' },
            { file: 'land7-digital-time-screens.xhtml', label: 'Digital Time & Screens' },
            { file: 'land7-holidays-celebrations-calendar.xhtml', label: 'Holidays & Celebrations' },
            { file: 'land7-school-schedules-timetables.xhtml', label: 'School Schedules' },
            { file: 'land7-time-in-music-rhythm.xhtml', label: 'Time in Music & Rhythm' },
        ],
    },
    {
        title: 'Back Matter',
        icon: '📚',
        color: '#475569',
        pages: [
            { file: 'back_sight_words-essential-sight-words-group-a.xhtml', label: 'Sight Words — Group A' },
            { file: 'back_sight_words-essential-sight-words-group-b.xhtml', label: 'Sight Words — Group B' },
            { file: 'back_sight_words-essential-sight-words-group-c.xhtml', label: 'Sight Words — Group C' },
            { file: 'back_action_verbs-body-movement-verbs.xhtml', label: 'Action Verbs — Body Movement' },
            { file: 'back_action_verbs-everyday-life-verbs.xhtml', label: 'Action Verbs — Everyday Life' },
            { file: 'back_adjectives-opposite-pairs.xhtml', label: 'Adjectives — Opposite Pairs' },
            { file: 'back_adjectives-feelings-colors-qualities.xhtml', label: 'Adjectives — Feelings & Colors' },
            { file: 'back_az_index-ac-words-across-all-lands.xhtml', label: 'A–Z Index: A–C' },
            { file: 'back_az_index-dk-words-across-all-lands.xhtml', label: 'A–Z Index: D–K' },
            { file: 'back_az_index-lr-words-across-all-lands.xhtml', label: 'A–Z Index: L–R' },
            { file: 'back_az_index-sz-words-across-all-lands.xhtml', label: 'A–Z Index: S–Z' },
            { file: 'back_visual_glossary-around-the-house-visual-vocabulary.xhtml', label: 'Visual Glossary — House' },
            { file: 'back_visual_glossary-at-the-store-visual-vocabulary.xhtml', label: 'Visual Glossary — Store' },
            { file: 'back_visual_glossary-on-the-street-visual-vocabulary.xhtml', label: 'Visual Glossary — Street' },
            { file: 'back_visual_glossary-at-the-doctor-visual-vocabulary.xhtml', label: 'Visual Glossary — Doctor' },
            { file: 'back_parent_teacher-classroom-language-commands.xhtml', label: 'Classroom Language' },
            { file: 'back_parent_teacher-parent-engagement-vocabulary.xhtml', label: 'Parent Engagement' },
            { file: 'back_parent_teacher-study-skills-learning-strategies.xhtml', label: 'Study Skills' },
            { file: 'back_asl_alphabet-asl-alphabet-am.xhtml', label: 'ASL Alphabet A–M' },
            { file: 'back_asl_alphabet-asl-alphabet-nz.xhtml', label: 'ASL Alphabet N–Z' },
            { file: 'back_asl_alphabet-asl-numbers-010.xhtml', label: 'ASL Numbers 0–10' },
            { file: 'back_asl_essential-essential-asl-greetings-social-25-signs.xhtml', label: 'ASL — Greetings' },
            { file: 'back_asl_essential-essential-asl-family-people-25-signs.xhtml', label: 'ASL — Family & People' },
            { file: 'back_asl_essential-essential-asl-actions-daily-life-25-signs.xhtml', label: 'ASL — Daily Life' },
            { file: 'back_asl_essential-essential-asl-feelings-food-places-25-signs.xhtml', label: 'ASL — Feelings & Food' },
        ],
    },
];

// Flatten all pages for sequential navigation
const ALL_PAGES = TOC.flatMap((section) => section.pages);

// Get the base URL for serving ebook files
const BASE = import.meta.env.BASE_URL || '/';
const EBOOK_BASE = `${BASE}ebook/pages/`;

/* ═══════════════════════════════════════════
 * TOC Sidebar Section
 * ═══════════════════════════════════════════ */
const TocSection = ({ section, currentPage, onPageSelect, isOpen, onToggle }) => {
    const sectionIndex = ALL_PAGES.findIndex((p) => p.file === section.pages[0]?.file);

    return (
        <div className={`bp-toc-section ${isOpen ? 'bp-toc-section--open' : ''}`}>
            <button
                className="bp-toc-section__header"
                onClick={onToggle}
                style={{ '--section-color': section.color }}
                aria-expanded={isOpen}
            >
                <span className="bp-toc-section__icon">{section.icon}</span>
                <span className="bp-toc-section__title">{section.title}</span>
                <span className="bp-toc-section__count">{section.pages.length}</span>
                <span className={`bp-toc-section__chevron ${isOpen ? 'bp-toc-section__chevron--open' : ''}`}>▾</span>
            </button>
            {isOpen && (
                <ul className="bp-toc-section__pages">
                    {section.pages.map((page, i) => (
                        <li key={page.file}>
                            <button
                                className={`bp-toc-page ${currentPage === sectionIndex + i ? 'bp-toc-page--active' : ''}`}
                                onClick={() => onPageSelect(sectionIndex + i)}
                                style={currentPage === sectionIndex + i ? { borderColor: section.color, color: section.color } : {}}
                            >
                                <span className="bp-toc-page__num">{sectionIndex + i + 1}</span>
                                <span className="bp-toc-page__label">{page.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

/* ═══════════════════════════════════════════
 * Main BookPreview Component
 * ═══════════════════════════════════════════ */
const BookPreview = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [openSections, setOpenSections] = useState({ 0: true }); // Front Matter open by default
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const iframeRef = useRef(null);

    const totalPages = ALL_PAGES.length;
    const currentPageData = ALL_PAGES[currentPage];
    const progress = ((currentPage + 1) / totalPages) * 100;

    // Find which section the current page belongs to
    const getCurrentSection = useCallback(() => {
        let pageCount = 0;
        for (let i = 0; i < TOC.length; i++) {
            if (currentPage < pageCount + TOC[i].pages.length) {
                return i;
            }
            pageCount += TOC[i].pages.length;
        }
        return 0;
    }, [currentPage]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                setCurrentPage((p) => Math.max(p - 1, 0));
            } else if (e.key === 'Home') {
                e.preventDefault();
                setCurrentPage(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                setCurrentPage(totalPages - 1);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [totalPages]);

    // Auto-open the current section when page changes
    useEffect(() => {
        const sectionIdx = getCurrentSection();
        setOpenSections((prev) => ({ ...prev, [sectionIdx]: true }));
        setMobileSidebarOpen(false);
    }, [currentPage, getCurrentSection]);

    // Reset iframe loaded state on page change
    useEffect(() => {
        setIframeLoaded(false);
    }, [currentPage]);

    const goTo = useCallback((pageIdx) => {
        setCurrentPage(pageIdx);
    }, []);

    const toggleSection = useCallback((idx) => {
        setOpenSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
    }, []);

    const currentSectionColor = TOC[getCurrentSection()]?.color || '#64748b';

    return (
        <div className="bp-container">
            {/* Header Bar */}
            <div className="bp-header">
                <div className="bp-header__left">
                    <button
                        className="bp-header__sidebar-toggle"
                        onClick={() => {
                            setSidebarOpen(!sidebarOpen);
                            setMobileSidebarOpen(!mobileSidebarOpen);
                        }}
                        aria-label="Toggle table of contents"
                    >
                        <span className="bp-hamburger">
                            <span /><span /><span />
                        </span>
                    </button>
                    <div className="bp-header__title">
                        <span className="bp-header__icon">📖</span>
                        <h1>Essential Picture Dictionary</h1>
                    </div>
                </div>
                <div className="bp-header__right">
                    <span className="bp-header__page-info">
                        Page <strong>{currentPage + 1}</strong> of <strong>{totalPages}</strong>
                    </span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bp-progress">
                <div
                    className="bp-progress__bar"
                    style={{ width: `${progress}%`, background: currentSectionColor }}
                />
            </div>

            <div className="bp-body">
                {/* Sidebar */}
                <aside
                    className={`bp-sidebar ${sidebarOpen ? 'bp-sidebar--open' : 'bp-sidebar--closed'} ${mobileSidebarOpen ? 'bp-sidebar--mobile-open' : ''
                        }`}
                >
                    <div className="bp-sidebar__header">
                        <h2>Table of Contents</h2>
                        <span className="bp-sidebar__total">{totalPages} pages</span>
                    </div>
                    <nav className="bp-sidebar__nav" aria-label="Book table of contents">
                        {TOC.map((section, idx) => (
                            <TocSection
                                key={idx}
                                section={section}
                                currentPage={currentPage}
                                onPageSelect={goTo}
                                isOpen={!!openSections[idx]}
                                onToggle={() => toggleSection(idx)}
                            />
                        ))}
                    </nav>
                </aside>

                {/* Mobile overlay backdrop */}
                {mobileSidebarOpen && (
                    <div className="bp-sidebar__backdrop" onClick={() => setMobileSidebarOpen(false)} />
                )}

                {/* Page Viewer */}
                <div className="bp-viewer">
                    <div className="bp-viewer__book">
                        {/* Loading indicator */}
                        {!iframeLoaded && (
                            <div className="bp-viewer__loading">
                                <div className="bp-viewer__spinner" />
                                <p>Loading page…</p>
                            </div>
                        )}
                        <iframe
                            ref={iframeRef}
                            key={currentPageData.file}
                            src={`${EBOOK_BASE}${currentPageData.file}`}
                            title={currentPageData.label}
                            className={`bp-viewer__iframe ${iframeLoaded ? 'bp-viewer__iframe--loaded' : ''}`}
                            onLoad={() => setIframeLoaded(true)}
                            sandbox="allow-same-origin"
                        />
                    </div>

                    {/* Navigation Controls */}
                    <div className="bp-nav">
                        <button
                            className="bp-nav__btn bp-nav__btn--prev"
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                            disabled={currentPage === 0}
                            aria-label="Previous page"
                        >
                            ← Previous
                        </button>

                        <div className="bp-nav__center">
                            <span className="bp-nav__scene-label" style={{ color: currentSectionColor }}>
                                {currentPageData.label}
                            </span>
                        </div>

                        <button
                            className="bp-nav__btn bp-nav__btn--next"
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                            disabled={currentPage === totalPages - 1}
                            aria-label="Next page"
                        >
                            Next →
                        </button>
                    </div>

                    {/* Keyboard hint */}
                    <p className="bp-viewer__hint">
                        Use <kbd>←</kbd> <kbd>→</kbd> arrow keys to navigate • <kbd>Home</kbd> / <kbd>End</kbd> to jump
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookPreview;
