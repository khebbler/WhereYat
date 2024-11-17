// DOM
$(document).ready(() => {

  // feed of tweets
  const $tweetFeed = $('#tweet-feed');

  // input for new tweets
  const $newTweet = $('#new-tweet');

  // tweet button
  const $tweetButton = $('#tweet-button');

  // back to home button
  const $backButton = $('<button class="btn btn-secondary mt-2 d-none">Back to Home</button>'); // (d-none hides button)

  // adding back button
  $tweetFeed.before($backButton);

  // adding username
  window.visitor = 'katherine';
  console.log(window.visitor);

  // displayTweets
  const displayTweets = (tweets = streams.home) => {

    // clearing tweetFeed
    $tweetFeed.empty();

    // reversing tweets before mapping
    const $tweets = tweets.slice().reverse().map((tweet) => {

      // $tweet = new div element
      const $tweet = $('<div class="list-group-item"></div>'); // bootstrap

      // timestamp of tweet
      const timestamp = moment(tweet.created_at).format('MMMM D, YYYY h:mm A'); // moments.js

      // timestamp of how long ago tweet was created
      const createdTimestamp = moment(tweet.created_at).fromNow(); // moment.js

      // using regex to find hashtags
      const hashtag = tweet.message.replace(/#(\w+)/g, (match, tag) => {
        // making hashtags clickable
        return `<span class="hashtag text-info" data-hashtag="${tag}" style="cursor: pointer;">${match}</span>`;
      });

      // html for tweet
        // username, timestamp, hashtag
      const tweetHtml = `
        <div>
          <strong class="username" data-username="${tweet.user}" style="cursor: pointer;">
              @${tweet.user}
            </strong>
            <span class="text-muted float-end">
              ${timestamp} (${createdTimestamp})
          </span>
        </div>
        <p>${hashtag}</p>
      `;

      // adding html to tweet
      $tweet.html(tweetHtml);

      // returning tweet
      return $tweet;
    });

    // appending HTML to $tweetFeed
    $tweetFeed.append($tweets);
  };

  // username click event listener
  $tweetFeed.on('click', '.username', function ()  {

    // getting clicked username
    const username = $(this).data('username');
    console.log(this);
    console.log(username);

    // getting users tweets
    const userTweets = streams.users[username];
    console.log(username, userTweets);

    // checking is user exist
    if (username && streams.users[username]) {
      // showing user's tweets
      displayTweets(userTweets);
      // showing back button
      $backButton.removeClass('d-none'); // bootstrap
    } else {
      console.error('No tweets');
    }
  });

  // Click event listener for hashtags
  $tweetFeed.on('click', '.hashtag', function () {
    // getting clicked hashtag
    const hashtag = $(this).data('hashtag');
    // filtering tweets with hashtag
    const hashtagTweets = streams.home.filter((tweet) => tweet.message.includes(`#${hashtag}`));
    // showing filtered tweets
    displayTweets(hashtagTweets);
    $backButton.removeClass('d-none');
  });

  // console.log(hashtag);

  // back to home click event listener
  $backButton.on('click', () => {
    // showing all tweets
    displayTweets();
    // hiding back button
    $backButton.addClass('d-none'); // bootstrap
  });

  // tweet button click event listener
  $tweetButton.on('click', () => {
    // getting input value
    const message = $newTweet.val().trim();

    if (!window.visitor) {
      alert('Error');
      return;
    }

    if (message) {
      // checking if visitor is in streams.users
      if (!streams.users[window.visitor]) {
        // user's tweets array
        streams.users[window.visitor] = [];
      }
      // adding tweet
      writeTweet(message);
      // clearing input box
      $newTweet.val('');
      // refreshing tweet feed
     displayTweets();
    } else {
      alert('Say something!');
    }
  });

  // calling displayTweets to show tweets
  displayTweets();
});

