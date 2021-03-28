import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import withSpinner from "../../components/with-spinner/with-spinner.component";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.action";
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = withSpinner(CollectionPage);

const ShopPage = ({ match, updateCollections }) => {
    const [loading, setLoading] = useState(true);
    let unsubscribeFromAuth = null;
    useEffect(() => {
        const collectionRef = firestore.collection('collections');
        unsubscribeFromAuth = collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            setLoading(false);
        });
        return () => {
            unsubscribeFromAuth();
        }
    }, []);

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
            <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionsPageWithSpinner isLoading={loading} {...props} />} />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);