// pages/protected.tsx

import {withAuth} from "./utils/withAuth";

function Protected() {
    return <div>Protected Content</div>;
}

export default withAuth(Protected);
