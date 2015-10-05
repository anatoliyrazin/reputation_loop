<?php

include("inc/init.php");

?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Coding Sample</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="css/style.css" media="screen" rel="stylesheet" type="text/css">
</head>
<body>
<div id="wrapper">
    <div class="main-container">
        <div class="container-center">
            <div class="header-top">
                <div class="header-top-left">
                  <div class="selection-title">Select lowest rating:</div>
                            <div>
                                <ul class="star-rating-select">
                                  <li class="active"><span class="st1">1</span></li>
                                  <li><span class="st2">2</span></li>
                                  <li><span class="st3">3</span></li>
                                  <li><span class="st4">4</span></li>
                                  <li><span class="st5">5</span></li>
                                </ul>
                            </div>
                  <div class="selection-title">Select review source:</div>
                            <div>
                                <ul class="source-review-select">
                                  <li><span class="internal">0</span></li>
                                  <li><span class="yelp">1</span></li>
                                  <li><span class="google">2</span></li>
                                </ul>
                            </div>
                </div>
                <div class="header-top-right">
                    <div class="company-detail-top">
                        <div class="company-detail">
                            <h2>&nbsp;</h2>
                            <div class="address-div">
                                <div class="address">
                                    <span><img title="Address" src="img/address.jpg" alt=""></span>
                                    <h4 class="location">&nbsp;<br>&nbsp;</h4>
                                </div>
                                <div class="address">
                                    <span><img src="img/phone.jpg" alt=""></span>
                                    <h4 class="phone">&nbsp;</h4>
                                </div>
                            </div>
                        </div>
                        <div class="rating-logo">
                            <div class="star-review">
                                <ul class="star-rating-big">
                                  <li><span class="s05" id="a05">0.5</span></li>
                                  <li><span class="s1" id="a1">1</span></li>
                                  <li><span class="s15" id="a15">1.5</span></li>
                                  <li><span class="s2" id="a2">2</span></li>
                                  <li><span class="s25" id="a25">2.5</span></li>
                                  <li><span class="s3" id="a3">3</span></li>
                                  <li><span class="s35" id="a35">3.5</span></li>
                                  <li><span class="s4" id="a4">4</span></li>
                                  <li><span class="s45" id="a45">4.5</span></li>
                                  <li><span class="s5" id="a5">5</span></li>
                                </ul>
                                <p><strong><span id="total-reviews"></span> Reviews</strong></p>
                                <p>Overall Rating:<br><strong><span id="average-rating"></span> out of 5</strong></p>

                            </div>
                        </div>
                    </div>

                </div>

            </div>

        <div class="content-area">
            <span class="content-area-left-title" style="background:#001936;"><h3>Client Reviews</h3></span>
            <div class="content-left-text-area">

<div id="img-loader" style="display: none;">
<img src="img/loader.gif">
</div>
<ul id="reviews">
</ul>
<ul id="reviews-source">
<li>
    <span class="blog-image">
        {_review_url_start}<img src="img/{_review_source}_logo.png">{_review_url_end}
    </span>
    <div class="content-text">
        <h3>
            <a target="_blank" href="{_customer_url}">{_fullname}</a>
        </h3>
        <span class="content-star">
            <div class="rating" style="display:none;">
                <span class="star-rating-control">
                    <div class="star-rating{_r1}"><a title="">on</a></div>
                    <div class="star-rating{_r2}"><a title="">on</a></div>
                    <div class="star-rating{_r3}"><a title="">on</a></div>
                    <div class="star-rating{_r4}"><a title="">on</a></div>
                    <div class="star-rating{_r5}"><a title="">on</a></div>
                </span>
            </div>
        </span>
        <span class="content-date">Date Of Review: {_review_date}</span>
        <p>{_review}</p>
    </div>
</li>
</ul>
<ul id="pageing">
<li class="pager page-n" id="page_1">1</li>
<li class="pager page-n" id="page_2">2</li>
<li class="pager page-n" id="page_3">3</li>
<li class="pager page-d" id="page_d1">...</li>
<li class="pager page-n" id="page_4"></li>
<li class="pager page-n" id="page_5"></li>
<li class="pager page-n" id="page_6"></li>
<li class="pager page-d" id="page_d2">...</li>
<li class="pager page-n" id="page_7"></li>
<li class="pager page-n" id="page_8"></li>
<li class="pager page-n" id="page_9"></li>
</ul>
            </div>
        </div>
    </div>
        </div>
</div>
<script type="text/javascript">
var pageVol = <?php echo $glPageVol ?>;
</script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script type="text/javascript" src="js/utils.js"></script>
</body></html>