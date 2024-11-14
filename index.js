
$(document).ready(() => {
  const $homeTimeline = $('#home-timeline');


  const renderTweets = () => {
    $homeTimeline.empty(); // clears previous tweets
    const $tweets = streams.home.map((tweet) => {
      const $tweet = $('<div class="tweet card p-2 my-2"></div>'); // bootstrap
      const text = `@${tweet.user}: ${tweet.message}`;

      $tweet.text(text);
      return $tweet;
    });
    $homeTimeline.append($tweets);
  };

  // Initial render of tweets
  renderTweets();
});



// $(document).ready(() => {
//   const $body = $('body');
//   $body.html(''); // .html('') clears everything inside the tag

//   const $tweets = streams.home.map((tweet) => {
//     const $tweet = $('<div></div>');
//     const text = `@${tweet.user}: ${tweet.message}`;

//     $tweet.text(text);

//     return $tweet;
//   });
//   $body.append($tweets);

// });

