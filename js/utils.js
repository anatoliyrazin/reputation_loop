// API can request either threshold or source selection
// disable threshold upon source selection
function disableRating() {
    jQuery('.header-top-left ul.star-rating-select li').each(function() {
        jQuery(this).removeClass('active');
    });
    selectedRating = 0;
}

// API can request either threshold or source selection
// disable source upon threshold selection
function disableThreshold() {
    jQuery('.header-top-left ul.source-review-select li').each(function() {
        jQuery(this).removeClass('active');
    });
    selectedSrc = 0;
}

function startRefreshing() {
    refreshingNow = true;
    jQuery('#img-loader').show();
}

function endRefreshing() {
    refreshingNow = false;
    jQuery('#img-loader').hide();
}

// reset business data upon initialization
function resetData(businessInfo) {
    jQuery('.company-detail h2').html(businessInfo.business_name);
    jQuery('.company-detail h4.location').html(businessInfo.business_address);
    jQuery('.company-detail h4.phone').html(businessInfo.business_phone);
}

// reorganize page upon content refresh
function organizePages() {
    jQuery('#pageing li').hide();
    var activePage = '';

    if(lastPage <= 9) {
        if(lastPage > 1) {
            for(var i = 1; i <= lastPage; i++) {
                jQuery('#page_'+i).show();
            }
            activePage = 'page_' + pageNum;
        }
    } else if(pageNum < 3) {
        jQuery('#page_9').html(lastPage);
        jQuery('#page_1, #page_2, #page_3, #page_d1, #page_9').show();
        activePage = (pageNum == 1) ? 'page_1' : 'page_2';
    } else if(pageNum > lastPage - 2) {
        jQuery('#page_7').html(lastPage - 2);
        jQuery('#page_8').html(lastPage - 1);
        jQuery('#page_9').html(lastPage);
        jQuery('#page_1, #page_d2, #page_7, #page_8, #page_9').show();
        activePage = (pageNum == lastPage) ? 'page_9' : 'page_8';
    } else {
        jQuery('#page_4').html(pageNum - 1);
        jQuery('#page_5').html(pageNum);
        jQuery('#page_6').html(pageNum + 1);
        jQuery('#page_9').html(lastPage);
        jQuery('#page_1, #page_d1, #page_4, #page_5, #page_6, #page_d2, #page_9').show();
        activePage = 'page_5';
    }

    jQuery('#pageing li').each(function() {
        jQuery(this).removeClass('active');
        var tid = jQuery(this).attr('id');
        if(tid == activePage) {
            jQuery(this).addClass('active');
        }
    });
}

// show and page rating data upon content regresh
function resetRating(ratingInfo) {
    var rt = 0;
    jQuery('#total-reviews').html(ratingInfo.total_no_of_reviews);
    jQuery('#average-rating').html(ratingInfo.total_avg_rating);
    jQuery('.star-rating-big li span').each(function() {
        jQuery(this).parent().removeClass('active');
        if(!rt) {
            if(Math.abs(parseFloat(jQuery(this).html()) - parseFloat(ratingInfo.total_avg_rating)) <= 0.25) {
                rt = 1;
                jQuery(this).parent().addClass('active');
            }
        }
    });
    lastPage = Math.ceil(parseInt(ratingInfo.total_no_of_reviews) / pageVol);
    organizePages();
}

// update review data upon content regresh
function updateReviews(reviewList) {
    var i = 0;
    var listedReviews = reviewList.length;
    
    var ulContent = '';
    while(i < listedReviews) {
        var liContent = jQuery('#reviews-source li').html();
        
        var reviewSrc = reviewList[i].review_from;
        if(reviewSrc == 0) {
            liContent = liContent.replace(/\{_review_url_start\}/, '');
            liContent = liContent.replace(/\{_review_url_end\}/, '');
            liContent = liContent.replace(/\{_review_source\}/, 'internal');
        } else {
            liContent = liContent.replace(/\{_review_url_start\}/, '<a target="_blank" href="' + reviewList[i].review_url + '">');
            liContent = liContent.replace(/\{_review_url_end\}/, '</a>');
            if(reviewSrc == 1) {
                liContent = liContent.replace(/\{_review_source\}/, 'google');
            } else {
                liContent = liContent.replace(/\{_review_source\}/, 'yelp');
            }
        }
        var fullName = reviewList[i].customer_name;
        if(reviewList[i].customer_last_name) {
            fullName = fullName + ' ' + reviewList[i].customer_last_name;
        }
        liContent = liContent.replace(/\{_fullname\}/, fullName);
        liContent = liContent.replace(/\{_customer_url\}/, reviewList[i].customer_url);
        var regex=/^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
        var parts = reviewList[i].date_of_submission.replace(regex,"$1 $2 $3 $4 $5 $6").split(' ');
        var date = new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
        var reviewDate = date.toDateString();
        liContent = liContent.replace(/\{_review_date\}/, reviewDate);
        liContent = liContent.replace(/\{_review\}/, reviewList[i].description);
        var rating = reviewList[i].rating;
        for(r = 1; r <= 5; r++) {
           if(r <= rating) {
              liContent = liContent.replace('{_r'+r+'\}', " star-rating-on");
           } else {
              liContent = liContent.replace('{_r'+r+'\}', "");
           }
        }
        ulContent = ulContent + '<li>' + liContent + '</li>';
        i++;
    }
    jQuery('#reviews').html(ulContent);
    endRefreshing();
}

// make ajax call to refresh content
function refreshContent(resetNow) {
    var params = new Object();
    params.action = 'refreshContent';

    params.page = pageNum - 1;
    if(selectedRating) {
        params.threshold = selectedRating;
    } else {
        jQuery('ul.source-review-select li span').each(function() {
            if(jQuery(this).parent().hasClass('active')) {
                var reviewSource = jQuery(this).attr('class');
                params[reviewSource] = 1;
            }
        });
    }

    jQuery.ajax({type: "POST",
                  url: 'ajax.php',
                 data: params,
             dataType: 'json',
            success: function(resp) {
                           // console.log(JSON.stringify(resp));
                           if(resp.result != 'success' || typeof resp.errorMessage != 'undefined') {
                               console.log(JSON.stringify(resp));
                           }
                           var businessInfo = resp.business_info;
                           var reviewList = resp.reviews;
                           if(resetNow) {
                               resetData(businessInfo);
                           }
                           resetRating(businessInfo.total_rating)
                           updateReviews(reviewList);
                       },
                error: function(jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR); console.log(textStatus); console.log(errorThrown);
                        }
        });
}

var selectedSrc;
var selectedRating;
var refreshingNow;
var pageNum;
var lastPage;

// initial data setup
function initData() {
    selectedSrc = 0;
    selectedRating = 1;
    refreshingNow = false;
    pageNum = 1;
}

// init data, run first content refresh and setup all events
jQuery(document).ready(function() {
    initData();
    startRefreshing();
    refreshContent(true);

    jQuery('.header-top-left ul li span').click(function() {
        if(refreshingNow) {
            return;
        }

        startRefreshing();
        pageNum = 1;
        var item = jQuery(this).attr('class');
        if(item == 'internal' || item == 'yelp' || item == 'google') {
            disableRating();
            if(jQuery(this).parent().hasClass('active')) {
                if(selectedSrc > 1) {
                    jQuery(this).parent().removeClass('active');
                    selectedSrc--;
                }
            } else {
                jQuery(this).parent().addClass('active');
                selectedSrc++;
            }
        } else {
            disableThreshold();
            selectedRating = jQuery(this).html();
            var i = 0;
            jQuery('.header-top-left ul.star-rating-select li').each(function() {
                if(++i <= selectedRating) {
                    jQuery(this).addClass('active');
                } else {
                    jQuery(this).removeClass('active');
                }
            });
        }
        refreshContent(false);
    });

    jQuery('#pageing li.page-n').click(function() {
        if(refreshingNow) {
            return;
        }
        startRefreshing();
        pageNum = parseInt(jQuery(this).html());
        refreshContent(false);
    });
});
