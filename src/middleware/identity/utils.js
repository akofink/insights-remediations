'use strict';

exports.IDENTITY_HEADER = 'x-rh-identity';

const DEFAULTS = Object.freeze({
    id: '100',
    org_id: 'test',
    account_number: 'test',
    username: 'tuser@redhat.com',
    email: 'tuser@redhat.com',
    first_name: 'test',
    last_name: 'user',
    address_string: 'test user tuser@redhat.com',
    is_active: true,
    is_org_admin: false,
    is_internal: true,
    locale: 'en_US'
});

exports.createIdentityHeader = function (id = DEFAULTS.id, account_number = DEFAULTS.account_number) {
    return encode({
        identity: {
            ...DEFAULTS,
            id,
            account_number
        }
    });
};

function encode (data) {
    return Buffer.from(JSON.stringify(data)).toString('base64');
}