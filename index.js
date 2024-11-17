$(document).ready(() => {
  // $tweetFeed = #tweet-feed
  const $tweetFeed = $('#tweet-feed');
  // back to home button
  // const $backButton = $('<button class="btn btn-secondary mt-2 d-none">Back to Home</button>');
  const $backButton = $('<button class="back-button">Back to Home</button>');

  // adding back button
  $tweetFeed.before($backButton);

  // displayTweets
  const displayTweets = () => {
    // clears #tweet-feed container
    $tweetFeed.empty();

  // looping through tweets in streams.home & mapping
  const $tweets = streams.home.map((tweet) => {

    // $tweet = new div element
    const $tweet = $('<div class="list-group-item"></div>'); // bootstrap

    // $timestamp of tweet
    const timestamp = moment(tweet.created_at).format('MMMM D, YYYY h:mm A'); // moments.js

    // $createdTimestamp = when tweet was made
    const createdTimestamp = moment(tweet.created_at).fromNow();

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


  // username click event listener
  $('.username').on('click', function () {
    // getting clicked username
    const username = $(this).data('username');
    // getting users tweets
    const userTweets = streams.users[username];
    // showing only users tweets
    displayTweets(userTweets);
    // showing back button
    $backButton.removeClass('d-none');
  });
};

// back to home click event listener
$backButton.on('click', () => {
  // showing all tweets
  displayTweets();
  // hiding back button
  $backButton.addClass('d-none');
});

  // calling displayTweets to display tweets
  displayTweets();
});

