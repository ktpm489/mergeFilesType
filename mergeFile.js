var _ = require('lodash');
function testData() {
    var originalAddresses = [{
        label: 'home',
        address: {
            city: 'London',
            zipCode: '12345'
        }
    }, {
        label: 'work',
        address: {
            city: 'New York',
            zipCode: '54321'
        }
    }];

    var updatedAddresses = [{
        label: 'home',
        address: {
            city: 'London (Central)',
            country: 'UK'
        }
    }, {
        label: 'spain',
        address: {
            city: 'Madrid',
            zipCode: '55555'
        }
    }];

    var org1 = [
        {
            "tag": "hot",
            "listChannel": [
                {
                    "tagItem": "vtv1",
                    "htmlLink": "http://tivis.101vn.com/livetv-xem-tivi-kenh-vtv1-menu-hot.html",
                    "imgLink": "http://www.gmodules.com/gadgets/proxy?container=ig&url=https://i.imgur.com/ksEAVCH.png",
                    "title": "VTV1 ",
                    "arrStreamLink": [
                        "http://tivis.101vn.com/ok/vtv/vtvshow.php"
                    ]
                }
            ]
        },
        {
            "tag": "hot2",
            "listChannel": [
                {
                    "tagItem": "vtv2",
                    "htmlLink": "http://tivis.101vn.com/livetv-xem-tivi-kenh-vtv1-menu-hot.html",
                    "imgLink": "http://www.gmodules.com/gadgets/proxy?container=ig&url=https://i.imgur.com/ksEAVCH.png",
                    "title": "VTV2 ",
                    "arrStreamLink": [
                        "http://tivis.101vn.com/ok/vtv/vtvshow2.php"
                    ]
                }
            ]
        }
    ]

    var org2 = [
        {
            "tag": "hot",
            "listChannel": [
                {
                    "tagItem": "vtv1",
                    "htmlLink": "http://tivis.101vn.com/livetv-xem-tivi-kenh-vtv1-menu-hot.html",
                    "imgLink": "http://www.gmodules.com/gadgets/proxy?container=ig&url=https://i.imgur.com/ksEAVCH.png",
                    "title": "VTV2 ",
                    "arrStreamLink": [
                        "http://tivis.101vn.com/ok/vtv/vtvshow3.php"
                    ]
                }
            ]
        },
        {
            "tag": "hot3",
            "listChannel": [
                {
                    "tagItem": "vtv4",
                    "htmlLink": "http://tivis.101vn.com/livetv-xem-tivi-kenh-vtv1-menu-hot.html",
                    "imgLink": "http://www.gmodules.com/gadgets/proxy?container=ig&url=https://i.imgur.com/ksEAVCH.png",
                    "title": "VTV4 ",
                    "arrStreamLink": [
                        "http://tivis.101vn.com/ok/vtv/vtvshow4.php"
                    ]
                }
            ]
        }
    ]

    var result = _.values(_.merge(
        _.keyBy(org1, 'tag'),
        _.keyBy(org2, 'tag')
    ));

    console.log(JSON.stringify(result));
}

 function mergeAndReplace(obj1, obj2, key) {
    return _.values(_.merge(
        _.keyBy(obj1, key),
        _.keyBy(obj2, key)
    ));
}

 function mergeNoReplace(obj1, obj2, key) {
    return MergeRecursive(obj1, obj2, key)
}
 function MergeRecursive(obj1, obj2, key) {

    for (var p in obj2) {
        try {
            // Property in destination object set; update its value.
            if (obj2[p].constructor == Object) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);

            } else {
                if (p === key) {
                    console.log('DD', Array.isArray(obj1[p]))
                    // console.log(typeof obj1[arrStream])
                    // console.log('2222',typeof obj1[arrStream].value)
                    obj1[p] = [...obj1[p], ...obj2[p]]
                } else {
                    obj1[p] = obj2[p];
                }

                console.log('p', p)
            }

        } catch (e) {
            // Property in destination object not set; create it and set its value.
            obj1[p] = obj2[p];

        }
    }
    return obj1;
}

function testMergeNoReplace() {
    let o1 = {
        a: 1,
        b: 2,
        c: {
            ca: 1,
            cb: 2,
            cc: {
                cca: 100,
                ccb: 200
            }
        },
        arrStream: [1, 2, 3, 4, 5]

    };

    let o2 = {
        a: 10,
        c: {
            ca: 10,
            cb: 20,
            cc: ['aaa', 'bbbb']
        },
        arrStream: [6, 7, 8, 9, 10]
    };
    let o3 = mergeNoReplace(o1, o2, 'arrStream');
    console.log('o3', JSON.stringify(o3))
}
// testMergeNoReplace()
// testData ()

module.exports = { mergeAndReplace, mergeNoReplace };