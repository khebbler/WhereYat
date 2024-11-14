$(document).ready(() => {
  // $tweetFeed = #tweet-feed
  const $tweetFeed = $('#tweet-feed');

  const displayTweets = () => {
    // clears #tweet-feed container
    $tweetFeed.empty();
  // looping through tweets & mapping
  const $tweets = streams.home.map((tweet) => {
    // $tweet = new div element
    const $tweet = $('<div class="list-group-item"></div>'); // bootstrap
    // text = username : message
    const text = `@${tweet.user}: ${tweet.message}`;
    // setting $tweet to text
    $tweet.text(text);
    // return array of $tweet elements
    return $tweet;
  });
  $tweetFeed.append($tweets);
};
// calling displayTweets to display tweets
displayTweets();
});
