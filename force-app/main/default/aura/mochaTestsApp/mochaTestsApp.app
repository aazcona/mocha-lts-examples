<aura:application extends="force:slds">

    <c:lts_mochaRunner testFiles="{!join(',',
        $Resource.mochaTests
	)}" />

</aura:application>