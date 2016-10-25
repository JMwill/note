/**
 * spa.model.js
 * Model module
 */
/* global TAFFY, $, spa */

// The people object API
// ---------------------
// The people object is available at spa.model.people
// The people object provides methods and events to manage
// a collection of person objects. Its public methods include:
//      * get_user() - return the current user person object.
//        If the current user is not signed-in, an anonymous person
//        object is returned.
//      * get_db() - return the TaffyDB database of all the person
//        objects - including the current user - pre-sorted
//      * get_by_cid( <client_id> ) - return a person object with
//        provided unique id.
//      * login( <user_name> ) - login as the user with the provided
//        user name. The current user object is changed to reflect
//        the new identify.
//      * logout() - revert the current user object to anonymous.
//
// jQuery global custom events published by the object include:
//      * 'spa-login' is published when a user login process
//        completes. The updated user object is provided as data.
//      * 'spa-logout' is published when a logout completes.
//        The former user object is provided as data.
//
// Each person is represented by person object.
// Person objects provide the following methods:
//      * get_is_user() - return true if object is the current user
//      * get_is_anon() - return true if object is anonymous
//
// The attributes for a person object include:
//      * cid - string client id. This is always defined, and
//        is only different from the id attribute
//        if the client data is not synced with the backend.
//      * id - the unique id. This may be undefined if the
//        object is not synced with the backend.
//      * name - the string name of the user.
//      * css_map - a map of attributes used for avatar presentation.
//
spa.model = (function() {
    'use strict';
    var
        configMap = { anon_id: 'a0' },
        stateMap = {
            anon_user: null,
            people_cid_map: {},
            people_db: TAFFY()
        },
        isFakeData = true,
        personProto, makePerson, people, initModule;
    personProto = {
        get_is_user: function() {
            return this.cid === stateMap.user.cid;
        },
        get_is_anon: function() {
            return this.cid === stateMap.anon_user.id;
        }
    };
    makePerson = function(person_map) {
        var person,
            cid         = person_map.cid,
            css_map     = person_map.css_map,
            id          = person_map.id,
            name        = person_map.name;
        if (cid === undefined || !name) {
            throw 'client id and name required';
        }
        person          = Object.create(personProto);
        person.cid      = cid;
        person.name     = name;
        person.css_map  = css_map;

        if (id) { person.id = id; }

        stateMap.people_cid_map[cid] = person;
        stateMap.people_db.insert(person);
        return person;
    };

    people = {
        get_db      : function() { return stateMap.people_db; },
        get_cid_map : function() { return stateMap.people_cid_map; }
    };

    initModule = function() {
        var i, people_list, person_map;

        // initialize anonymous person
        stateMap.anon_user = makePerson({
            cid : configMap.anon_id,
            id  : configMap.anon_id,
            name: 'anonymous'
        });
        stateMap.user = stateMap.anon_user;

        if (isFakeData) {
            people_list = spa.fake.getPeopleList();
            for (i = 0; i < people_list.length; i++) {
                person_map = people_list[i];
                makePerson({
                    cid     : person_map._id,
                    css_map : person_map.css_map,
                    id      : person_map._id,
                    name    : person_map.name
                });
            }
        }
    };
    return {
        initModule  : initModule,
        people      : people
    };
}());
