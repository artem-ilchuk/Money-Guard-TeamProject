import Balance from "../Balance/Balance";
import TransactionList from "../TransactionsList/TransactionsList/TransactionsList";
import useMedia from '../../hooks/UseMadia'

const HomeTab = () => {
	const { isMobile, isTablet, isDesctop } = useMedia();
	return <div>
		{isMobile && <Balance />}
		<h1 style={{ color: 'black' }}>HELLO HOME!</h1>
		<TransactionList />
	</div>;
};

export default HomeTab;
