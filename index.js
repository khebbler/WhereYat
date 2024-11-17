$(document).ready(() => {
  // feed of tweets
  const $tweetFeed = $('#tweet-feed');

  // input for new tweets
  const $newTweet = $('#new-tweet');

  // submit tweet button
  const $tweetButton = $('#tweet-button');

  // back to home button
  const $backButton = $('<button class="btn btn-secondary mt-2 d-none">Back to Home</button>');


  // adding back button
  $tweetFeed.before($backButton);

  // displayTweets
  const displayTweets = (tweets = streams.home) => {
    // clearing #tweet-feed container
    $tweetFeed.empty();

  // looping through tweets & mapping
  const $tweets = tweets.map((tweet) => {

    // $tweet = new div element
    const $tweet = $('<div class="list-group-item"></div>'); // bootstrap

    // timestamp of tweet
    const timestamp = moment(tweet.created_at).format('MMMM D, YYYY h:mm A'); // moments.js

    // createdTimestamp = when tweet was made
    const createdTimestamp = moment(tweet.created_at).fromNow(); // moment.js

    // HTML for tweet
    const tweetHtml = `
      <div>
        <strong class="username" data-username="${tweet.user}" style="cursor: pointer;">
            @${tweet.user}
          </strong>
          <span class="text-muted float-end">
            ${timestamp} (${createdTimestamp})
        </span>
      </div>
      <p>${tweet.message}</p>
    `;

    // adding HTML to $tweet
    $tweet.html(tweetHtml);

    // returning $tweet
    return $tweet;
  });

  // appending HTML to $tweetFeed
  $tweetFeed.append($tweets);
};

  // username click event listener
  $tweetFeed.on('click', '.username', function ()  {

    // getting clicked username
    const username = $(this).data('username');

    console.log(username);
    console.log(this); // debug
    console.log(username); // debug

    // getting users tweets
    const userTweets = streams.users[username];

    console.log(username, userTweets); //debug

    // checking is user exist
    if (username && streams.users[username]) {
      // getting user's tweets
      const userTweets = streams.users[username];
      // showing user's tweets
      displayTweets(userTweets);
      // showing back button
      $backButton.removeClass('d-none'); // bootstrap
    } else {
      console.error('No tweets');

    }
  });

// back to home click event listener
$backButton.on('click', () => {
  // showing all tweets
  displayTweets();
  // hiding back button
  $backButton.addClass('d-none'); // bootstrap
});

  // calling displayTweets to show tweets
  displayTweets();
});

