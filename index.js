$(document).ready(() => {
  // $tweetFeed = #tweet-feed
  const $tweetFeed = $('#tweet-feed');

  // displayTweets
  const displayTweets = () => {
    // clears #tweet-feed container
    $tweetFeed.empty();

  // looping through tweets in streams.home & mapping
  const $tweets = streams.home.map((tweet) => {

    // $tweet = new div element
    const $tweet = $('<div class="list-group-item"></div>'); // bootstrap

    // $timestamp
    const timestamp = moment(tweet.created_at).format('MMMM D, YYYY h:mm A'); // moments.js

    // HTML for tweet
    const tweetHtml = `
      <div>
        <strong>@${tweet.user}</strong>
        <span class="text-muted" style="float: right;">${timestamp}</span>
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

  // calling displayTweets to display tweets
  displayTweets();
});

