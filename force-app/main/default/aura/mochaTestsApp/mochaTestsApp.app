<aura:application extends="force:slds">

    <c:lts_mochaRunner testFiles="{!join(',',
		$Resource.whenUseCasesTests,
		$Resource.thenUseCasesTests
	)}" />

</aura:application>
