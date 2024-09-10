import CartPage from '../Cart';

export default function Page({ params }: { params: { id: string } }) {
    return <CartPage userId={params.id} />;
}