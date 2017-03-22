function detect(values) {
    console.log("HGola, ", values)
}

function Archiver() {
    var data = null;
    var archive = [];

    Object.defineProperty(this, 'data', {
        get: function () {
            
            return data;
        },
        set: function (value) {
            detect(data)
            data = value;
            archive.push({
                val: data
            });
        }
    });

    this.getTrace = function () {
        return archive;
    };
}

/*
var arc = new Archiver();
arc.data; // 'get!'
arc.data = 11;
arc.data = 13;
console.log(arc.getArchive())
arc.getArchive(); // [{ val: 11 }, { val: 13 }]
*/

module.exports = Archiver;