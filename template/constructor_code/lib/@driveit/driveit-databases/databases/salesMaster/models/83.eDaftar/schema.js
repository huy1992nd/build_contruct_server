const Sequelize = require("sequelize");
const StatusEnum = require('../enums/Status');

module.exports = () => {
    return {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        chassisNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bookingNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        customerId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        customerName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        product: {
            type: Sequelize.STRING,
            allowNull: true
        },
        productId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bookingType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bookingTypeId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        action: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: StatusEnum.ACTION.NA,
            values: [StatusEnum.actionMode],
        },
        status: {
            type: Sequelize.ENUM,
            allowNull: false,
            defaultValue: 'pending',
            values: ['pending', 'cancelled', 'fail', 'new', 'success'],
        },
        registrationNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        submissionDate: {
            type: Sequelize.DATE,
        },
        sentDate: {
            type: Sequelize.DATE,
        },
        //2.1  fields for tab Data Asal Kenderaan
        operasi: {
            type: Sequelize.INTEGER(2),
            defaultValue: 1,
            // 1: for insert, 2: for delete
        },
        buatan: {
            type: Sequelize.STRING,
        },
        jenisBadanId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        jenisBadanName: {
            type: Sequelize.STRING,
        },
        noCasis: {
            type: Sequelize.STRING,
        },
        tahunDibuat: {
            type: Sequelize.STRING,
        },
        mutanDuduk: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        statusAsal: {
            type: Sequelize.STRING,
        },

        kegunaanId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kegunaanName: {
            type: Sequelize.STRING,
        },
        colorId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        colorName: {
            type: Sequelize.STRING,
        },
        namaModel: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
        noEnjin: {
            type: Sequelize.STRING,
        },
        kuasaEnjin: {
            type: Sequelize.STRING,
        },
        bahanBakarId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bahanBakarName: {
            type: Sequelize.STRING,
        },
        pacuan4Roda: {
            type: Sequelize.STRING,
        },
        vtaSerialNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // add for mode view.
        responseDate: {
            type: Sequelize.DATE,
        },
        responseDetail: {
            type: Sequelize.STRING,
        },
        isExcisePaid: {
            type: Sequelize.BOOLEAN,
        },

        //2.2  fields for tab [Data kenderaan Komersial]
        bdmBkg: {
            type: Sequelize.DECIMAL,
        },
        btt: {
            type: Sequelize.DECIMAL,
        },

        btm: {
            type: Sequelize.DECIMAL,
        },

        beratKerb: {
            type: Sequelize.DECIMAL,
        },

        bg1: {
            type: Sequelize.DECIMAL,
        },
        bg2: {
            type: Sequelize.DECIMAL,
        },

        bg3: {
            type: Sequelize.DECIMAL,
        },

        bg4: {
            type: Sequelize.DECIMAL,
        },
        bg5: {
            type: Sequelize.DECIMAL,
        },
        bg6: {
            type: Sequelize.DECIMAL,
        },
        bg7: {
            type: Sequelize.DECIMAL,
        },
        bg8: {
            type: Sequelize.DECIMAL,
        },
        bg9: {
            type: Sequelize.DECIMAL,
        },
        bg10: {
            type: Sequelize.DECIMAL,
        },
        bg11: {
            type: Sequelize.DECIMAL,
        },
        bg12: {
            type: Sequelize.DECIMAL,
        },

        // 2.3 for tab [Data pemilik]
        kategoriId: {
            type: Sequelize.STRING,
        },
        kategoriName: {
            type: Sequelize.STRING,
        },
        namaPemilik: {
            type: Sequelize.STRING,
        },
        jenisId: {
            type: Sequelize.INTEGER(2),
            defaultValue: 1, //1: other 2: kp Baru
            allowNull: false,
        },
        noIdPemilik: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tarikhLahir: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        jantina: {
            type: Sequelize.INTEGER(2),
            defaultValue: 1, //1: lelaki 2: perempuan
        },
        noTel: {
            type: Sequelize.STRING,
        },
        almat1: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        almat2: {
            type: Sequelize.STRING,
        },
        almat3: {
            type: Sequelize.STRING,
        },

        bandarId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        bandarName: {
            type: Sequelize.STRING,
        },
        poskod: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        negeriId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        negeriName: {
            type: Sequelize.STRING,
        },

        // data tambahan
        syarikatKewangan: {
            type: Sequelize.STRING,
        },
        noRujukanTambahan: {
            type: Sequelize.STRING,
        },
        jenisBarangan: {
            type: Sequelize.STRING,
        },
        noPendaftaranKenderaanLama: {
            type: Sequelize.STRING,
        },
        noEnjinKenderaanLama: {
            type: Sequelize.STRING,
        },
        noCasisKenderaanLama: {
            type: Sequelize.STRING,
        },

        // tab [data online-Rac] with mode view.
        racNo: {
            type: Sequelize.STRING,
        },
        branchId: {
            type: Sequelize.UUID,
            allowNull: true,
        },
        branchName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        // for fields default.
        deleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        updatedBy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    };
}