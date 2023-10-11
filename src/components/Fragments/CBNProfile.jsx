import CompanyLogo from '../Elements/CompanyLogo'

const CBNProfile = ({ darkMode }) => {
  return (
    <CompanyLogo
      img={`/img/logos/${darkMode ? 'coffeecup_light_x128.png' : 'coffeecup_x128.png'}`}
      alt={'Cafe CBN'}
      companyName="Cafe CBN"
      moreClass="space-1 font-size-18 font-weg-600 nowrap justify-self-start"
      color={darkMode ? 'var(--accent-color1-hover)' : 'var(--accent-color1)'}
    />
  )
}

export default CBNProfile
