/**
 * [Easter Egg]
 * Here is the Easter Egg I was talking about. A simple utility for using
 * Redux that does NOT require you to pass around actions to dispatch
 * reducers or thunk-reducers. Just a standardized configuration to make
 * the implementation consistent, standardized, and easily traceable.
 */

import { useState } from "react";
import { type as dataType } from "ramda";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";

export const createReduxReducer = (prop, initialState=null, reducers={}, autoInjectState=true) => {
    /**
     * [IMPORTANT ABOUT]
     * Generating a unique ID (UUID) and appending the reducer object
     * keys with it, while retaining the original reducer names,
     * enables the developer to be able to create a single Redux store
     * use the SAME reducer names, across combined reducers, and
     * call those reducers without any naming conflicts because
     * the use of this key guarentees uniqueness and, effectively,
     * namespaces the reducer functions automatically.
     */

    ////////////////////////////////////////////////////////////////////

    /**
     * Generates a unique ID that will be used to append each of
     * the reducer names (a.k.a the "keys" of the "reducers" object)
     * which guarentees uniqueness.
     */
    const reducerKey = uuid();

    /**
     * Transform modules into objects. This is required for the
     * redux-thunk implmentation to work correctly.
     */
    for (const reducer in reducers)
        if (dataType(reducers[reducer]) === "Module")
            reducers[reducer] = {...reducers[reducer]};

    /**
     * Retains the original reducer names and types so that the function
     * names match what the reducer functions to the appropriate reducer.
     */
    const reducerTypes = Object.keys(reducers).map(key => ({
        $key: key,
        $type: dataType(reducers[key])
    }));

    // Used to consistently generate the key names themselves.
    const typeKey = (name, key) => `${name}::${key}`;

    /**
     * [IMPORTANT]
     * This changes the original reducer by appending "::<uuid>" to
     * the name of the reducer (a.k.a the "key" of the object)
     * in order to ensure uniqueness.
     *
     * [NOTE]
     * A "resolver" is a function, or intended function, expected to
     * be used as a reducer for redux to dispatch. Depending on the
     * implementation, using this utility, there is a difference in
     * use depending on wether the user chooses to use a redux-thunk
     * or not.
     *
     * ---
     * Additionally, for redux-thunk support, a resolver function
     * can be defined as an "Object" type, containing key properties.
     * The keys of the resolver object will be used as resolvers
     * themselves and called on the objects namespace, as a function
     * when used. The expected properties for a resolver to have in
     * order to be considered a redux-thunk resolver are:
     * 1. resolve - As an async/await funciton.
     * 2. pending - Regular function (not async/await)
     * 3. success - Regular function (not async/await)
     * 4. failure - Regular function (not async/await)
     *
     * [Example - Reducer Creation] Shows how to declare these.
     * export const [
     *     myReducer,
     *     useMyReducer,
     *     useMyReducerData
     * ] = createReduxReducer = (<state_selector>, <initial_state>, {
     *     // The "myResolver" is intended to be a redux-thunk series of
     *     // reducers and requires these properties to be defined.
     *     myResolver: {
     *         resolve: async () => {
     *             // Do fancy API stuff...
     *             const data = await doFancyApiStuff();
     *
     *             // from API.
     *             return data;
     *         },
     *         pending: () => ({ isLoading: true }),
     *         success: myData => ({ isLoading: false, myData }),
     *         failure: () => ({ isLoading: false })
     *     },
     *     // This is a regular reducer (a.k.a resolver) to update Redux state.
     *     myOtherResolver: stuff => ({ moreStuff: stuff })
     * });
     *
     * [Example - Implementation] This shows how to use these.
     * import { useMyReducer, useMyReducerData } from "<path>/<to>/<reducer>";
     *
     * export const MyComponent = () => {
     *     const { isLoading } = useMyReducerData();
     *     const { myResolver, myOtherResolver } = useMyReducer();
     *
     *     useEffect(() => {
     *         myResolver(data);
     *         myOtherResolver();
     *     }, []);
     *
     *     return !isLoading && ...
     * }
     *
     * [Example - Explanation]
     * For the "myResolver" Because this loop (code below) reconstructs the
     * resolveres before they are ever used, the "myResolver" method will
     * fire these actions (i.e "resolve", "pending", "success"/"failure")
     * to be resolved in the reducer, passing in all the data as an array
     * and spreading that over the function to be treated as regular positional
     * arguments.
     *
     * 1. "myResolver.pending::<uuid>"
     * 2. "myResolver.success::<uuid>"
     *
     * OR - If an error occurs.
     *
     * 3. "myResolver.failure::<uuid>"
     *
     * In the "myOtherResolver", it just gets called directly because it
     * is not formatted as an object expecting to be treated as a redux-thunk.
     *
     * [Benefits]
     * Each of these methods are treated as their own resolvers in
     * the reducer, which means they are treated the exact same way
     * as the other resolver functions; except that we have the added
     * benefit of namespacing with the object and globally namespaced
     * functions with the use of the UUID. Thus, preventing any kind of
     * naming conflict for resolver functions of the same name. Giving
     * us the flexibility to focus on a common resolver naming pattern,
     * while combining reducers and focusing on the business login
     * for that isolated reducer in the applications Redux state.
     */

    for (const reducer in reducers) {
        const resolver = reducers[reducer];

        if (dataType(resolver).includes("Function"))
            reducers[typeKey(reducer, reducerKey)] = resolver;
        else if (dataType(resolver) === "Object") {
            for (const thunkKey of Object.keys(resolver))
                reducers[typeKey(`${reducer}.${thunkKey}`, reducerKey)] = resolver[thunkKey];
        }

        delete reducers?.[reducer];
    }

    return [
        /**
         * The actual reducer method that dynamically calls each
         * defined reducer function.
         */
        (state=initialState, { type, argv }) => {
            if (!reducers || !reducers?.[type])
                return {...state};
            else {
                if (!autoInjectState) {
                    const update = reducers[type](state, argv);
                    return update ?? {...state};
                } else {
                    let applyState = true;
                    let diff = reducers[type](...argv);

                    if (dataType(diff) === "Function") {
                        applyState = false;
                        diff = diff(state);
                    }

                    return !!applyState && !!diff
                        ? {...state, ...diff }
                        : !applyState && !!diff
                            ? {...diff}
                            : {...state};
                }
            }
        },

        /**
         * This is the reducer hook.
         * Doing it this way allows at least 1 run of
         * the actions to be loaded. This allows these
         * reducers to be used inside other initial useEffect
         * hooks in the app.
         */
        () => {
            const dispatch = useDispatch();
            const [ actions ] = useState(() => {
                let data = {};

                for (const { $key, $type } of reducerTypes)
                    data[$key] = (...argv) => {

                        if ($type.includes("Function"))
                            dispatch({ type: typeKey($key, reducerKey), argv });
                        else if ($type === "Object")
                            dispatch(async thunkDispatch => {
                                const resolve = typeKey(`${$key}.resolve`, reducerKey);
                                const pending = typeKey(`${$key}.pending`, reducerKey);
                                const success = typeKey(`${$key}.success`, reducerKey);
                                const failure = typeKey(`${$key}.failure`, reducerKey);

                                try {
                                    if (!!reducers[pending])
                                        thunkDispatch({
                                            type: pending,
                                            argv
                                        });

                                    const results = await reducers[resolve](...argv);

                                    if (!!reducers[success])
                                        thunkDispatch({
                                            type: success,
                                            argv: [ results ] ?? []
                                        });
                                } catch(e) {
                                    if (!!reducers[failure])
                                        thunkDispatch({
                                            type: failure,
                                            argv: e
                                        });
                                }
                            });
                    }

                return data;
            });

            return actions;
        },

        /**
         * Hook-based utility to easily obtain the data within the redux store
         * for a particular reducer without having to manually import and call
         * the "useSelector" method with a callback.
         */
        selector => useSelector(data =>
            !!selector
                ? selector(data?.[prop])
                : data?.[prop]
        )
    ]
}