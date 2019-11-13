export async function getTweeter() {
    const root = await axios({
        method: 'get',
        url: "https://comp426fa19.cs.unc.edu/a09/tweets",
        withCredentials: true
    });
    return root;
}
//--------------------------
export function load() {
    const $root = $('#root');
    $root.html(' ');
    let tweeter = '';
    const loadinfo = async function () {
        let info = await getTweeter();
        for (let i = 0; i < 25; i++) {
            tweeter += (`<div>${info.data[i].body} </div>`);
        }
        $root.append(tweeter);
    }
    loadinfo();
}
//---------------------------
export function tweetBox() {
    const $root = $('#root');
    $root.html(' ');
    let tweeter = '<div id="tweeters">';

    const loadinfo = async function () {
        let info = await getTweeter();
        for (let i = 0; i < 50; i++) {
            let isMineConfirmation = false;
            tweeter += (`<br>`);
            if (info.data[i].isMine) {
                isMineConfirmation = true;
                tweeter += `<div id="${info.data[i].id}" class="personalTweet">`;
            }
            tweeter += (`<div id="tile">`);
            if (info.data[i].isMine) {
                tweeter += `<div id="author"> Author:${info.data[i].author}</div>`;
                tweeter +=`<button type="button" class ="delete" id="${info.data[i].id}"> Delete </button>)`;
            } else {
                tweeter += (`<div id="author"> Author:     ${info.data[i].author}</div>`);
            }
            tweeter += (`<div class="body" id="${info.data[i].id}">${info.data[i].body}</div>`);//don't touch this 
            if (info.data[i].isMine) {
                tweeter += `<button type="button" class ="edit" id="${info.data[i].id}" value="${info.data[i].body}">Edit</button>`;
            }
            tweeter += (`
                <div id="count">
                <div id="likec">Likes: ${info.data[i].likeCount}</div>
                <div id="replyc">Replys: ${info.data[i].replyCount} </div>
                <div id="retweetc">Retweets: ${info.data[i].retweetCount}</div>
                <button type="button" id="${info.data[i].id}" class="like" value="${info.data[i].isLiked}"> <3 Like </button>
                <button type="button" id="${info.data[i].id}" class="reply"> Reply </button>
                <button type="button" id="${info.data[i].id}" class="retweet"> ReTweeter </button>
                </div>`);
            tweeter += (`</div>`);
            if (isMineConfirmation) {
                tweeter += `</div>`
            }
            tweeter += (`<br>`);
            tweeter += (`<br>`);
    }
    $root.append(tweeter);
}
    loadinfo();
    tweeter += `</div>`;
}
//--------------------------------
export function newTweet() {
    const $root = $('#root');
    $root.html(' ');
    let tweeter = '';
    tweeter += `<input id = "inp" type = "text">`;
    tweeter += `<button type="button" id="postt"> Post </button>`;
    $root.append(tweeter);


}
//--------------------------------
export async function postTweet() {

    let input = document.getElementById("inp").value;

    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            body: input
        }

    });
    tweetBox();
    newTweet();
}
//--------------------------------

export async function likeTweet(c) {
    if (event.target.value === "false") {
        let z = event.target.id;
        let x = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + z + '/like';
        const result = await axios({
            method: 'put',
            url: x,
            withCredentials: true,
        });
        renderTweeter();
    } else {
        let z = event.target.id;
        let x = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + z + '/unlike';
        const result = await axios({
            method: 'put',
            url: x,
            withCredentials: true,
        });
        renderTweeter();
    }
}
//--------------------------------
export async function retweetOpen(){
    let z = event.target.id;
    const info = await axios({
        method: 'get',
        url: "https://comp426fa19.cs.unc.edu/a09/tweets/"+z,
        withCredentials: true
    });
    console.log(info.data.body)
    event.preventDefault();
    $('div[id=' + z + ']').html(`<form id="${z}" class="retweetForm">
        <textarea id="retweettime"></textarea>
        <button id="${z}" class="editRetweet" type="submitRetweet">Submit</button></form>`);

        $(document).on('click', ".editRetweet", function () {
            reTweet(info.data.author,info.data.body);
        });

}
export async function reTweet(c,m) {
    let z = event.target.id; 
    let textinbox = ""+ $('textarea#retweettime').val()+ "";
    //            "body": `<div> ${textinbox}</div>`+`</div>`+"<div>Retweeted From: " + c + "</div>"+`<div> ${m}</div>` 

    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "retweet",
            "parent": z,
            "body": textinbox +c + m 
        },
    });
   // renderTweeter();
}
export async function reTweetRender(){
    const $root = $('#root');
    $root.html(' ');
    let tweeter = '<div id="tweeters">';

            if(info.data[i].replyCount>0){
                for (let j = 0; j < 5; j++) {
                    let isMineConfirmation = false;
                    tweeter += (`<br>`);
                    let temp=info.data[i].replies[j];
                    console.log(temp);
                }
            
                    if (info.data[i].replies.data[j].isMine) {
                        isMineConfirmation = true;
                        tweeter += `<div id="${info.data[i].replies[j].id}" class="personalTweet">`;
                    }
                    tweeter += (`<div id="tile">`);
                    if (info.data[i].replies[j].isMine) {
                        tweeter += (`<div id="author"> Author:     ${info.data[i].replies[j].author}<button type="button" class ="delete" id="${info.data[i].replies[j].id}">Delete</button></div>`);
                    } else {
                        tweeter += (`<div id="author"> Author:     ${info.data[i].replies[j].author}</div>`);
                    }
                    tweeter += (`<div class="body" id="${info.data[i].reply[j].id}">${info.data[i].replies[j].body}</div>`);//don't touch this 
                    if (info.data[i].replies[j].isMine) {
        
                        tweeter += `<button type="button" class ="edit" id="${info.data[i].replies[j].id}" value="${info.data[i].replies[j].body}">Edit</button>`;
        
                    }
                    tweeter += (`
                        <div id="count">
                        <div id="likec">Likes: ${info.data[i].replies[j].likeCount}</div>
                        <div id="replyc">Replys: ${info.data[i].replies[j].replyCount} </div>
                        <div id="retweetc">Retweets: ${info.data[i].replies[j].retweetCount}</div>
                        <button type="button" id="${info.data[i].replies[j].id}" class="like" value="${info.data[i].reply[j].isLiked}"> <3 Like </button>
                        <button type="button" id="${info.data[i].replies[j].id}" class="reply"> Reply </button>
                        <button type="button" id="${info.data[i].replies[j].id}" class="retweet"> ReTweeter </button>
                        </div>`);
                    tweeter += (`</div>`);
                    if (isMineConfirmation) {
                        tweeter += `</div>`
                    }
            }
}

//--------------------------------

export async function openEditTweet() {
    let z = event.target.id;

    event.preventDefault();
    $('div[id=' + z + ']').html(`<form id="${z}" class="editForm">
        <textarea id="edit"> ${event.target.value}</textarea>
        <button id="${z}" class="editSubmit" type="submit">Submit</button></form>`);


    $(document).on('click', `.editSubmit`, function () {
        console.log("test test test test");

        editTweet();
    });
}
export async function editTweet() {
    event.preventDefault();
    let z = event.target.id;
    let x = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + z;
    let y = "" + $("textarea[id=edit]").val() + "";
    console.log(y);
    const result = await axios({
        method: 'put',
        url: x,
        withCredentials: true,
        data: {
            body: y
        },
    });
    renderTweeter();
}
//--------------------------------
export async function openReplyTweet() {
    let z = event.target.id;
    event.preventDefault();
    $('div[id=' + z + ']').html(`<form id="${z}" class="replyForm">
        <textarea id="reply"> ${event.target.value}</textarea>
        <button id="${z}" class="replySubmit" type="replySubmit">Submit</button></form>`);

    $(document).on('click', `.replySubmit`, function () {
        replyTweet();
    });
}
export async function replyTweet() {
    event.preventDefault();

    let z = event.target.id;
    var div = document.getElementById(z);
    let y = "" + $("textarea[id=reply]").val() + "";
    console.log(y);
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "reply",
            "parent": z,
            "body": y
        },
    });
    renderTweeter();
}
//--------------------------------
export async function destroyTweet(c) {
    let z = event.target.id;
    let x = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + z;
    const result = await axios({
        method: 'delete',
        url: x,
        withCredentials: true,
    });
    renderTweeter();
}
//--------------------------------

export function renderTweeter() {
    tweetBox();
    newTweet();
}
//I need to write functions to give me
//name of people who tweet
//date of the tweet
//body of tweet IS DONE
//isliked
//isretweeted
$(function () {
    renderTweeter();
    $(document).on('click', `#postt`, function () {postTweet();});
    $(document).on('click', `.like`, function () {likeTweet();});
    $(document).on('click', `.edit`, function () {openEditTweet();});
    $(document).on('click', `.delete`, function () {destroyTweet();});
    //worry about retweet later 
    $(document).on('click', `.retweet`, function () {retweetOpen();});
    $(document).on('click', `.reply`, function () {openReplyTweet();});
});
