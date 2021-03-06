/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have an URL', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            };
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name', function() {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(0);
            };
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {
        const body = document.body;
        const menuitem = document.querySelector('.menu-icon-link');

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() { // Body .menu-hidden toggle
            expect(body.className).toContain('menu-hidden'); // When menuitem is clicked yet
        });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when clicked', function() {
            menuitem.click(); // Then, when clicked
            expect(body.className).not.toContain('menu-hidden'); // Expect not to contain class anymore

            menuitem.click(); // Then, when clicked again
            expect(body.className).toContain('menu-hidden'); // Return to default state
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial entries', function() {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) { // Before testing anything, make sure feed is loaded
            loadFeed(0, done);
        });

        it('contains at least one .entry element within .feed container', function(done) {
            const entries = document.querySelector(".feed").getElementsByClassName("entry");
            expect(entries.length).not.toBe(0); // At least one entry-item in feed-array
            done();
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New feed selection', function() {
        let entriesT1; // Need to be defined here in order to be accessible in test
        let entriesT2; // As they first require a function running (loadFeed), we cannot assign these vars to a value yet

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                entriesT1 = document.querySelector(".feed").innerHTML; // After running loadFeed 0, assign to var (Is innerHTML better than innerText?)

                loadFeed(1, function() { // After running loadFeed 1, assign to var
                    entriesT2 = document.querySelector(".feed").innerHTML;
                    done(); // Makes sure these functions are ran (i.e. feeds are loaded) before running tests
                });
            });
        });

        it('content changes when new feed is loaded', function(done) {
            expect(entriesT1).not.toEqual(entriesT2);
            done();
        });
    });
}());