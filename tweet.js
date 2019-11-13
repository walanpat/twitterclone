//Alright so lets do this 

export class Tweet {
    constructor() {
        this.id;
        //The unique identification number assigned
        //to the Tweet by the server database
        this.type;
        //Specifies whether the Tweet is a regular
        //tweet ("tweet"), a reply to another Tweet
        //("reply"), or a retweet of another Tweet
        //("retweet"))
        //Must be one of the following values:
        //["tweet", "retweet", "reply"]
        this.body;
        //Body of text of the tweet.
        this.author;
        //first name and last initial of the 
        //use who posted the tweet, As a STRING
        this.parentID;
        //If this tweet is a reply or a retweet, this is the ID of the referenced tweet.
        this.isMine;
        //If this tweet is a reply or retweet and the referenced tweet is available, then this is the 
        //referenced tweets data.
        this.isLiked;
        //True if the tweet was created by the current logged in avatar.
        this.retweetCount;
        //the number of retweets for this tweet
        this.replyCount;
        //number of replys
        this.likeCount;
        //number of likes
        this.someLikes;
        //a non exhaustive list of named of users
        //who have liked this tweet.
        this.replies;
        //if available, this is an ARRAY of reply tweets
        //that were posted in response to this tweet.
        this.createdAt;
        //date adn time at which it was posted
        this.updatedAt;
        //date and tiem at which the tweet was last updated.
    }
}