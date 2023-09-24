export const useCounter = () => {
  const page = useState('page', () => 0)

  return {
    page
  }
}
