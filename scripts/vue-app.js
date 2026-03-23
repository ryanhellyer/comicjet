(function () {
    /**
     * Vue-powered UI rendering for Comic Jet.
     *
     * Note: This intentionally keeps the existing DOM IDs/classes so the
     * existing `style.css` continues to apply unchanged.
     */
    function parseTutorialValue() {
        var raw = null;
        try {
            raw = localStorage.getItem("tutorial");
        } catch (e) {
            raw = null;
        }
        if (raw === null || typeof raw === "undefined") return null;
        var n = parseInt(raw, 10);
        if (n !== 1 && n !== 2) return null;
        return n;
    }

    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    function getTargetPageFromHash() {
        var hash = window.location.hash || "";
        if (hash === "") return 1;
        var raw = hash.substring(1);
        var n = parseInt(raw, 10);
        return isNaN(n) ? 1 : n;
    }

    function tutorialTexts(primaryLanguage) {
        // Mirrors scripts/translation.js
        if (primaryLanguage === "de") {
            return {
                change: "Klick auf den Comic für Deutsch",
                revert: "Klick den comic für die Ausgangssprache",
            };
        }
        return {
            change: "Click the comic to change it's language",
            revert: "Click the comic to revert back to the original language",
        };
    }

    window.init_vue_app = function init_vue_app() {
        if (typeof Vue === "undefined" || !Vue.createApp) {
            // Vue CDN script didn't load.
            return;
        }

        var state = Vue.reactive({
            pageType: "root",
            primaryLanguage: null,
            secondaryLanguage: null,
            currentComic: null,
            totalPages: 0,

            // Comic page render state
            pages: [],
            hiddenPages: [],
            tutorial: parseTutorialValue(),

            // UI state
            showScrollToTop: false,
            lastUpdatedUrlHash: null,
            homeLinkUrl: "",
            pulldownOpen: false,

            // Scroll handling
            scrollTargetPageNumber: null,
            lastPathname: window.location.pathname
        });

        var loadingGifUrl = home_url + "images/loading.gif";

        function addHiddenPage(pageNumber) {
            if (state.hiddenPages.indexOf(pageNumber) === -1) state.hiddenPages.push(pageNumber);
        }

        function isTutorialHidden(pageNumber) {
            return state.tutorial === 2 && state.hiddenPages.indexOf(pageNumber) !== -1;
        }

        function imageSrcFor(pageNumber, language) {
            var comicSlugEn = get_current_comic_slug("en");
            return comics_folder_url + comicSlugEn + "/" + pageNumber + "-" + language + ".jpg";
        }

        function preloadTwo(urlA, urlB, callback) {
            var loaded = 0;
            var done = function () {
                loaded += 1;
                if (loaded === 2) callback();
            };

            var imgA = new Image();
            imgA.onload = done;
            imgA.onerror = done;
            imgA.src = urlA;

            var imgB = new Image();
            imgB.onload = done;
            imgB.onerror = done;
            imgB.src = urlB;
        }

        function setLabelsForPage() {
            // Mirrors scripts/translation.js behavior for the ids that exist on the static HTML.
            var primary = state.primaryLanguage;
            var siteTitle = document.getElementById("site-title");
            var legalNotice = document.getElementById("legal-notice");
            var creation = document.getElementById("creation");
            var copyright = document.getElementById("copyright");

            if (copyright) copyright.innerHTML = "Copyright";

            if (creation) {
                creation.innerHTML = primary === "de" ? "Eine kreation von" : "A creation of";
            }

            if (legalNotice) {
                legalNotice.innerHTML = primary === "de" ? "Impressum (auf Englisch)" : "Legal Notice";
            }

            if (!siteTitle) return;
            if (state.pageType === "home") {
                siteTitle.innerHTML = primary === "de" ? "Englisch lernen von Comics" : "Learn German from comics";
            } else if (state.pageType === "comic" && state.currentComic) {
                siteTitle.innerHTML = state.currentComic.name[state.secondaryLanguage];
            } else if (state.pageType === "legal-notice") {
                siteTitle.innerHTML = "Legal Notice";
            } else if (state.pageType === "404") {
                siteTitle.innerHTML = "404 Error";
            }
        }

        function setBodyClassForPage() {
            // Mirrors replace_body_class calls from the vanilla version.
            if (state.pageType === "home") document.body.className = "home";
            else if (state.pageType === "comic") document.body.className = "comic";
            else if (state.pageType === "legal-notice") document.body.className = "legal-notice";
            else if (state.pageType === "404") document.body.className = "error-404";
            else document.body.className = "";
        }

        function scrollToPageNumberIfNeeded(pageNumber) {
            if (state.scrollTargetPageNumber !== pageNumber) return;
            state.scrollTargetPageNumber = null;
            Vue.nextTick(function () {
                var img = document.getElementById(String(pageNumber));
                if (img && typeof img.scrollIntoView === "function") {
                    img.scrollIntoView();
                }
            });
        }

        function addPage(pageNumber, options) {
            if (state.pageType !== "comic") return;
            if (state.totalPages && pageNumber > state.totalPages) return;

            var shouldScroll = options && options.scrollTarget === true;

            // In the vanilla version, tutorial blobs are hidden immediately if tutorial==2.
            if (state.tutorial === 2) addHiddenPage(pageNumber);

            var page = Vue.reactive({
                number: pageNumber,
                shownLanguage: state.secondaryLanguage,
                src: loadingGifUrl,
                width: "20%",
                shouldScrollWhenLoaded: shouldScroll
            });

            state.pages.push(page);

            var comicSlugEn = get_current_comic_slug("en");
            var initialShownLanguage = page.shownLanguage;
            var otherLanguage = initialShownLanguage === state.primaryLanguage ? state.secondaryLanguage : state.primaryLanguage;

            var urlShown = comics_folder_url + comicSlugEn + "/" + pageNumber + "-" + initialShownLanguage + ".jpg";
            var urlOther = comics_folder_url + comicSlugEn + "/" + pageNumber + "-" + otherLanguage + ".jpg";

            preloadTwo(urlShown, urlOther, function () {
                page.width = "100%";
                page.src = comics_folder_url + comicSlugEn + "/" + pageNumber + "-" + page.shownLanguage + ".jpg";
                if (page.shouldScrollWhenLoaded) scrollToPageNumberIfNeeded(pageNumber);
                page.shouldScrollWhenLoaded = false;
            });
        }

        function ensurePagesUntil(pageNumber, scrollTarget) {
            if (state.pageType !== "comic") return;
            if (state.totalPages) {
                pageNumber = Math.max(1, Math.min(parseInt(pageNumber, 10) || 1, state.totalPages));
            } else {
                pageNumber = Math.max(1, parseInt(pageNumber, 10) || 1);
            }

            state.scrollTargetPageNumber = scrollTarget === true ? pageNumber : null;

            while (state.pages.length < pageNumber) {
                var nextNumber = state.pages.length + 1;
                addPage(nextNumber, { scrollTarget: nextNumber === pageNumber && scrollTarget === true });
            }

            // If the target page was already loaded and we're not currently loading it,
            // scroll immediately.
            var existing = null;
            for (var i = 0; i < state.pages.length; i++) {
                if (state.pages[i].number === pageNumber) {
                    existing = state.pages[i];
                    break;
                }
            }
            if (!existing) return;

            if (existing.src !== loadingGifUrl) {
                scrollToPageNumberIfNeeded(pageNumber);
            } else if (scrollTarget === true) {
                existing.shouldScrollWhenLoaded = true;
            }
        }

        function getCurrentPageNumberFromViewport() {
            var comicList = document.getElementById("comic");
            if (!comicList) return 1;
            var lis = comicList.getElementsByTagName("li");
            if (!lis || lis.length === 0) return 1;

            var scrollTop = getScrollTop();
            var currentDistanceFromTop = scrollTop + window.innerHeight;
            var currentPageNumber = 1;

            for (var i = 0; i < lis.length; i++) {
                var rect = lis[i].getBoundingClientRect();
                var distanceFromTop = rect.top + scrollTop;
                if (distanceFromTop < currentDistanceFromTop) currentPageNumber = i + 1;
            }

            return currentPageNumber;
        }

        function setPageUrl(currentPageNumber) {
            var hash = window.location.hash.substring(1);
            if (hash === String(currentPageNumber)) return;

            var string = "/" + state.primaryLanguage + "/" + state.secondaryLanguage + "/" + get_current_comic_slug() + "/";
            if (is_number(currentPageNumber)) string = string + "#" + currentPageNumber;

            window.history.pushState(null, null, string);
        }

        function maybeAddNewPage(loadToSpecificAnchor) {
            if (state.pageType !== "comic") return;
            if (typeof loadToSpecificAnchor === "undefined") loadToSpecificAnchor = false;

            if (!state.totalPages) return;

            if (state.pages.length === 0) {
                addPage(1, { scrollTarget: false });
                return;
            }

            if (state.pages.length >= state.totalPages) return;

            var comicList = document.getElementById("comic");
            if (!comicList || !comicList.lastElementChild) return;

            var lastPage = comicList.lastElementChild;
            var rect = lastPage.getBoundingClientRect();
            var distanceOfLastPageFromTop = rect.top + getScrollTop();
            var currentDistanceFromTop = getScrollTop() + window.innerHeight;

            if (loadToSpecificAnchor === true || distanceOfLastPageFromTop < currentDistanceFromTop) {
                addPage(state.pages.length + 1, { scrollTarget: false });
            }
        }

        function toggleTutorialAndLanguage(pageNumber) {
            if (state.pageType !== "comic") return;

            var page = null;
            for (var i = 0; i < state.pages.length; i++) {
                if (state.pages[i].number === pageNumber) {
                    page = state.pages[i];
                    break;
                }
            }
            if (!page) return;

            // Tutorial step transitions (mirrors scripts/clicks.js)
            if (state.tutorial === null) {
                state.tutorial = 1;
                localStorage.setItem("tutorial", 1);
            } else if (state.tutorial === 1) {
                state.tutorial = 2;
                localStorage.setItem("tutorial", 2);
                addHiddenPage(pageNumber);
            } else if (state.tutorial === 2) {
                addHiddenPage(pageNumber);
            }

            // Swap displayed language for this page only.
            var newLanguage = page.shownLanguage === state.secondaryLanguage ? state.primaryLanguage : state.secondaryLanguage;
            page.shownLanguage = newLanguage;
            page.src = imageSrcFor(pageNumber, newLanguage);
            page.width = "100%";
        }

        function syncFromLocation() {
            var type = get_page_type();

            if (type === "root") {
                window.history.pushState(null, null, get_home_link_url());
                type = "home";
            }

            state.pageType = type;
            state.primaryLanguage = get_primary_language();
            state.secondaryLanguage = get_secondary_language();
            state.lastPathname = window.location.pathname;

            if (type === "comic") {
                state.currentComic = get_current_comic();
                state.totalPages = state.currentComic ? state.currentComic.pages : 0;
            } else {
                state.currentComic = null;
                state.totalPages = 0;
            }

            state.homeLinkUrl = get_home_link_url();
            state.pulldownOpen = false;
            setBodyClassForPage();
            setLabelsForPage();
            state.tutorial = parseTutorialValue();

            // Reset content when switching page types.
            state.pages.splice(0, state.pages.length);
            state.hiddenPages.splice(0, state.hiddenPages.length);
            state.lastUpdatedUrlHash = null;

            if (type === "comic") {
                var targetPageNumber = getTargetPageFromHash();
                ensurePagesUntil(targetPageNumber, true);
            }
        }

        function scrollHandler() {
            if (state.pageType !== "comic") return;

            // Update scroll-to-top button visibility
            state.showScrollToTop = getScrollTop() > 20;

            maybeAddNewPage(false);

            var currentPageNumber = getCurrentPageNumberFromViewport();
            if (currentPageNumber && state.lastUpdatedUrlHash !== currentPageNumber) {
                state.lastUpdatedUrlHash = currentPageNumber;
                setPageUrl(currentPageNumber);

                var storageSlug = get_current_comic_slug(state.primaryLanguage);
                if (storageSlug) localStorage.setItem(storageSlug, currentPageNumber);
            }
        }

        window.addEventListener("popstate", function () {
            var type = get_page_type();
            var pathname = window.location.pathname;

            // If only the hash changed for the same comic page, avoid resetting pages.
            if (
                type === "comic" &&
                state.pageType === "comic" &&
                pathname === state.lastPathname
            ) {
                // Vanilla behavior: when hash becomes empty, refresh the content.
                if ((window.location.hash || "") === "") {
                    syncFromLocation();
                    return;
                }

                var t = getTargetPageFromHash();
                ensurePagesUntil(t, true);
                return;
            }

            syncFromLocation();
        });
        window.addEventListener("hashchange", function () {
            // Only handle hash changes on comic pages; otherwise nothing special.
            if (get_page_type() === "comic") {
                if ((window.location.hash || "") === "") {
                    syncFromLocation();
                    return;
                }
                // Ensure pages exist for the requested hash.
                var t = getTargetPageFromHash();
                ensurePagesUntil(t, false);
            }
        });
        window.addEventListener("scroll", scrollHandler, { passive: true });

        // Primary menu (home button + scroll-to-top) is separate so we can keep #primary-menu empty on non-comic pages.
        Vue.createApp({
            setup: function () {
                function onHomeClick() {
                    window.history.pushState(null, null, state.homeLinkUrl);
                    syncFromLocation();
                    window.scrollTo(0, 0);
                }

                function scrollToTop() {
                    window.scrollTo(0, 0);
                }

                return {
                    state: state,
                    onHomeClick: onHomeClick,
                    scrollToTop: scrollToTop
                };
            },
            template:
                '<a v-if="state.pageType===\'comic\'" id="home" :href="state.homeLinkUrl" @click.prevent="onHomeClick">' +
                '{{ state.primaryLanguage===\'de\' ? \'Start\' : \'Home\' }}' +
                '</a>' +
                '<a v-if="state.pageType===\'comic\'" id="scroll-to-top" href="#" ' +
                ':style="{visibility: state.showScrollToTop ? \'visible\' : \'hidden\'}" @click.prevent="scrollToTop">' +
                '{{ state.primaryLanguage===\'de\' ? \'Nach oben\' : \'To top\' }}' +
                '</a>'
        }).mount("#primary-menu");

        // Main page content mount point
        Vue.createApp({
            setup: function () {
                function toggleLanguagePulldown() {
                    state.pulldownOpen = !state.pulldownOpen;
                }

                function selectLearnLanguage(lang) {
                    // Mirrors scripts/clicks.js behavior:
                    // - Click "Learn German" (lang=de) -> primary=en, secondary=de -> /en/de/
                    // - Click "Englisch lernen" (lang=en) -> primary=de, secondary=en -> /de/en/
                    if (lang === "en") {
                        set_primary_language_cookie("de");
                        set_secondary_language_cookie("en");
                        window.history.pushState(null, null, "/de/en/");
                    } else if (lang === "de") {
                        set_primary_language_cookie("en");
                        set_secondary_language_cookie("de");
                        window.history.pushState(null, null, "/en/de/");
                    }

                    set_home_links();
                    state.pulldownOpen = false;
                    syncFromLocation();
                    window.scrollTo(0, 0);
                }

                function tutorialInnerClass() {
                    if (state.tutorial === null) return "tutorial-click-to-change";
                    return "tutorial-click-to-revert";
                }

                function tutorialInnerText() {
                    var texts = tutorialTexts(state.primaryLanguage);
                    if (state.tutorial === null) return texts.change;
                    return texts.revert;
                }

                function onComicInteract(pageNumber) {
                    toggleTutorialAndLanguage(pageNumber);
                }

                function getHomeComicSlug(comic) {
                    return comic.slug[state.primaryLanguage];
                }

                function getHomeComicLink(comic) {
                    var slug = comic.slug[state.primaryLanguage];
                    var storageslug = slug;
                    var page_number = localStorage.getItem(storageslug);
                    var pageHash = page_number !== null ? "#" + page_number : "";
                    return home_url + state.primaryLanguage + "/" + state.secondaryLanguage + "/" + slug + "/" + pageHash;
                }

                function getHomeComicThumbnail(comic) {
                    return home_url + "comics/" + comic.slug["en"] + "/thumbnail-en.jpg";
                }

                function getHomeComicName(comic) {
                    return comic.name[state.primaryLanguage];
                }

                return {
                    state: state,
                    toggleLanguagePulldown: toggleLanguagePulldown,
                    selectLearnLanguage: selectLearnLanguage,
                    tutorialInnerClass: tutorialInnerClass,
                    tutorialInnerText: tutorialInnerText,
                    onComicInteract: onComicInteract,
                    comics: comics,
                    home_url: home_url,
                    getHomeComicSlug: getHomeComicSlug,
                    getHomeComicLink: getHomeComicLink,
                    getHomeComicThumbnail: getHomeComicThumbnail,
                    getHomeComicName: getHomeComicName
                };
            },
            template: "\
<template v-if=\"state.pageType==='home'\">\
  <div id=\"language-selector\" @click=\"toggleLanguagePulldown\">\
    <span id=\"language-selector-text\">{{ state.primaryLanguage==='de' ? 'Wählen Sie eine Sprache zum Lernen' : 'Select a language to learn' }}</span> &nbsp;&#x25bc;\
    <div id=\"language-selector-pulldown\" :style=\"{left: state.pulldownOpen ? '0px' : '-999em'}\">\
      <span class=\"select-language\" id=\"learn-de\" @click.stop=\"selectLearnLanguage('de')\">Learn German</span>\
      <span class=\"select-language\" id=\"learn-en\" @click.stop=\"selectLearnLanguage('en')\">Englisch lernen</span>\
    </div>\
  </div>\
  <div id=\"comic-selection\">\
    <div class=\"block block-1\" v-for=\"(comic, i) in comics\" :key=\"getHomeComicSlug(comic)\" :id=\"getHomeComicSlug(comic)\">\
      <a :id=\"'comic-link-' + i\" :href=\"getHomeComicLink(comic)\" class=\"block-inner\">\
        <img :id=\"getHomeComicSlug(comic)\" :src=\"getHomeComicThumbnail(comic)\" />\
        <p>{{ getHomeComicName(comic) }}</p>\
      </a>\
    </div>\
  </div>\
</template>\
\
<template v-else-if=\"state.pageType==='legal-notice'\">\
  <div id=\"static-page\">\
    <h3>Personal Information</h3>\
    <p>Like most websites, we collect non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, Internet Protocol (IP) address, referring site, and the date and time of each visitor request. Our purpose in collecting non-personally identifying information is to better understand how our visitors use our website. From time to time, we may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of the website.</p>\
    <h3>Browser storage</h3>\
    <p>Browser storage allows a website to store information on a visitor’s computer. We use this to store information such as the last visited comic, last page read and whether the end of the comic has been reached previously.</p>\
    <h3>Contact information</h3>\
    <p><a href=\"https://ryan.hellyer.kiwi/contact/\">Ryan Hellyer</a><br />Friedrichstraße 123<br />Berlin 10117<br />Germany<br /></p>\
  </div>\
</template>\
\
<template v-else-if=\"state.pageType==='404'\">\
  <img :src=\"home_url + '/images/404.png'\" />\
</template>\
\
<template v-else-if=\"state.pageType==='comic'\">\
  <ol id=\"comic\">\
    <li v-for=\"page in state.pages\" :key=\"page.number\">\
      <img class=\"comic-page\" :id=\"page.number\" :src=\"page.src\" :style=\"{width: page.width}\" @click=\"onComicInteract(page.number)\" />\
      <span class=\"tutorial-blob\" :style=\"{display: isTutorialHidden(page.number) ? 'none' : undefined}\" @click=\"onComicInteract(page.number)\">\
        <span v-if=\"!isTutorialHidden(page.number)\" :class=\"tutorialInnerClass()\">{{ tutorialInnerText() }}</span>\
      </span>\
      <div class=\"page-counter\"><strong>{{ page.number }}</strong>/{{ state.totalPages }}</div>\
    </li>\
  </ol>\
</template>\
\
<template v-else></template>",
            methods: {
                isTutorialHidden: function (pageNumber) {
                    return isTutorialHidden(pageNumber);
                }
            }
        }).mount("#page-content");

        // Initial load
        syncFromLocation();
    };
})();

